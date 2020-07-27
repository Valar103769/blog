# export2Excel 

需求, 把当前查询条件下所有页的数据导出为.xlsx文件格式,

目前的实现思路是: 先查询page=1的数据,取出返回的allPages(eg:3), 之后映射出所有剩余的页码[2,3], 再调用promise.all取剩余所有页的数据,合并page=1的数据. 


```vue
 // demo.vue
<template>
  <div >
    <el-form :inline="true" >
        <el-form-item style="float:right">
            <el-button type="primary" plain @click="dialogFormVisible = true" icon="el-icon-document">导出Excel
            </el-button>
        </el-form-item>

    </el-form>
   
      <el-dialog title="选择时间" :visible.sync="dialogFormVisible" width="30%">
          <el-form label-width="120px">

              <el-form-item label="日期">
                  <el-date-picker
                          v-model="date"
                          type="date"
                          placeholder="选择日期">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="文件名称">
                  <el-input v-model="filename"></el-input>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="()=>{dialogFormVisible = false; downloadLoading= false}">取 消</el-button>
              <el-button type="primary" @click="handleDownload" :loading="downloadLoading">确 定</el-button>
          </div>
      </el-dialog>
  </div>
</template>

<script>

const MAX_RESULT = 50

  export default {
    data: function () {
      return {
          downloadLoading: false,
          dialogFormVisible: false,
          date: moment().startOf("days").format("YYYY-MM-DD HH:mm:ss"), // excel的date
          filename: 'xxx',
      }
    },
      methods: {
          async handleDownload() {
              this.downloadLoading = true

              let list = await this.fetchList()
              if (!list.length) {
                  return this.$message('当天没有数据')
        }

              import('@/utils/Export2Excel').then(excel => {
                  const tHeader = ['订单号', '类型', '状态', '商品说明', '交易前金额', '交易金额', '交易后金额', '充值时间', '到账时间']
                  const filterVal = ['outOrderId', 'type', 'state', 'toAcct', 'ucaBeforeMoney', 'incMoney', 'ucaAfterMoney', 'ct', 'lut']

                  const data = this.formatJson(filterVal, list)
                  excel.export_json_to_excel({
                      header: tHeader,
                      data,
                      filename: this.filename,
                      autoWidth: true,
                  })
              })
              this.dialogFormVisible = false
      },
          formatJson(filterVal, jsonData) {
              return jsonData.map(v => filterVal.map(j => {
                  if (j === 'type') {
                      const map = {
                          'fee': '扣款',
                          'refund': '退款',
                          'back': '返款',
                          'part_refund': '部分退款'
                      }
                      return map[v[j]]
                  }
                  if (j === 'state') {
                      const map = {
                          'wait': '充值中',
                          'succ': '成功',
                          'fail': '失败',
                      }
                      return map[v[j]]
                  }
                  if (['ucaBeforeMoney', 'incMoney', 'ucaAfterMoney'].includes(j)) {
                      return (v[j] / 1000).toFixed(2)
                  }

                  return v[j]
              }))
          },
          async fetchList() {

              // 先请求第一次的数据,再判断是否还有数据,获取剩余数据
              const {allPages, contentlist} = await $.post('/chargeLog/list', {
                  currentPage: 1,
                  maxResult: MAX_RESULT,
            
              }, null, 'json')
              if (allPages > 1) { // 有超过1页, 3 => [2,3]
                  const pageList = [...Array(allPages).keys()].map(item => {
                      return item + 1
                  })
                  pageList.shift(0)

                  const list = await this.fetchRemainList(pageList)
                  this.downloadLoading = false
                  return Promise.resolve(contentlist.concat(list))
              } else {
                  this.downloadLoading = false
                  return Promise.resolve(contentlist)
              }
          },
          fetchRemainList(pageList) {

              return new Promise((resolve, reject) => {
                  const promise = pageList.map(page => {
                      return $.post('/chargeLog/list', {
                          currentPage: page,
                          maxResult: MAX_RESULT,
                     
                      }, null, 'json')
                  })
                  Promise.all(promise).then(posts => {
                      const resList = posts.reduce((accu, curr) => {
                          return accu.concat(curr.contentlist)
                      }, [])
                      resolve(resList)
                  }).catch(reason => {
                      reject(reason)
                  })
              })
          },
      }

  }
</script>


```

```js
// Export2Excel.js
import {saveAs} from 'file-saver'
import XLSX from 'xlsx'

function generateArray(table) {
    var out = [];
    var rows = table.querySelectorAll('tr');
    var ranges = [];
    for (var R = 0; R < rows.length; ++R) {
        var outRow = [];
        var row = rows[R];
        var columns = row.querySelectorAll('td');
        for (var C = 0; C < columns.length; ++C) {
            var cell = columns[C];
            var colspan = cell.getAttribute('colspan');
            var rowspan = cell.getAttribute('rowspan');
            var cellValue = cell.innerText;
            if (cellValue !== "" && cellValue == +cellValue) cellValue = +cellValue;

            //Skip ranges
            ranges.forEach(function (range) {
                if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
                    for (var i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
                }
            });

            //Handle Row Span
            if (rowspan || colspan) {
                rowspan = rowspan || 1;
                colspan = colspan || 1;
                ranges.push({
                    s: {
                        r: R,
                        c: outRow.length
                    },
                    e: {
                        r: R + rowspan - 1,
                        c: outRow.length + colspan - 1
                    }
                });
            }
            ;

            //Handle Value
            outRow.push(cellValue !== "" ? cellValue : null);

            //Handle Colspan
            if (colspan)
                for (var k = 0; k < colspan - 1; ++k) outRow.push(null);
        }
        out.push(outRow);
    }
    return [out, ranges];
};

function datenum(v, date1904) {
    if (date1904) v += 1462;
    var epoch = Date.parse(v);
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function sheet_from_array_of_arrays(data, opts) {
    var ws = {};
    var range = {
        s: {
            c: 10000000,
            r: 10000000
        },
        e: {
            c: 0,
            r: 0
        }
    };
    for (var R = 0; R != data.length; ++R) {
        for (var C = 0; C != data[R].length; ++C) {
            if (range.s.r > R) range.s.r = R;
            if (range.s.c > C) range.s.c = C;
            if (range.e.r < R) range.e.r = R;
            if (range.e.c < C) range.e.c = C;
            var cell = {
                v: data[R][C]
            };
            if (cell.v == null) continue;
            var cell_ref = XLSX.utils.encode_cell({
                c: C,
                r: R
            });

            if (typeof cell.v === 'number') cell.t = 'n';
            else if (typeof cell.v === 'boolean') cell.t = 'b';
            else if (cell.v instanceof Date) {
                cell.t = 'n';
                cell.z = XLSX.SSF._table[14];
                cell.v = datenum(cell.v);
            } else cell.t = 's';

            ws[cell_ref] = cell;
        }
    }
    if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
    return ws;
}

function Workbook() {
    if (!(this instanceof Workbook)) return new Workbook();
    this.SheetNames = [];
    this.Sheets = {};
}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

export function export_table_to_excel(id) {
    var theTable = document.getElementById(id);
    var oo = generateArray(theTable);
    var ranges = oo[1];

    /* original data */
    var data = oo[0];
    var ws_name = "SheetJS";

    var wb = new Workbook(),
        ws = sheet_from_array_of_arrays(data);

    /* add ranges to worksheet */
    // ws['!cols'] = ['apple', 'banan'];
    ws['!merges'] = ranges;

    /* add worksheet to workbook */
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;

    var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
    });

    saveAs(new Blob([s2ab(wbout)], {
        type: "application/octet-stream"
    }), "test.xlsx")
}

export function export_json_to_excel({
                                         multiHeader = [],
                                         header,
                                         data,
                                         filename,
                                         merges = [],
                                         autoWidth = true,
                                         bookType = 'xlsx'
                                     } = {}) {
    /* original data */
    filename = filename || 'excel-list'
    data = [...data]
    data.unshift(header);

    for (let i = multiHeader.length - 1; i > -1; i--) {
        data.unshift(multiHeader[i])
    }

    var ws_name = "SheetJS";
    var wb = new Workbook(),
        ws = sheet_from_array_of_arrays(data);

    if (merges.length > 0) {
        if (!ws['!merges']) ws['!merges'] = [];
        merges.forEach(item => {
            ws['!merges'].push(XLSX.utils.decode_range(item))
        })
    }

    if (autoWidth) {
        /*设置worksheet每列的最大宽度*/
        const colWidth = data.map(row => row.map(val => {
            /*先判断是否为null/undefined*/
            if (val == null) {
                return {
                    'wch': 10
                };
            }
            /*再判断是否为中文*/
            else if (val.toString().charCodeAt(0) > 255) {
                return {
                    'wch': val.toString().length * 2
                };
            } else {
                return {
                    'wch': val.toString().length
                };
            }
        }))
        /*以第一行为初始值*/
        let result = colWidth[0];
        for (let i = 1; i < colWidth.length; i++) {
            for (let j = 0; j < colWidth[i].length; j++) {
                if (result[j]['wch'] < colWidth[i][j]['wch']) {
                    result[j]['wch'] = colWidth[i][j]['wch'];
                }
            }
        }
        ws['!cols'] = result;
    }

    /* add worksheet to workbook */
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;

    var wbout = XLSX.write(wb, {
        bookType: bookType,
        bookSST: false,
        type: 'binary'
    });
    saveAs(new Blob([s2ab(wbout)], {
        type: "application/octet-stream"
    }), `${filename}.${bookType}`);
}
```
