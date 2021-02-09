/** @file:工具文件 */
import {
    Loading
} from 'element-ui'

let loading;
let loadingCount = 0;

function start() {
    loading = Loading.service({
        lock: true,
        spinner: 'el-icon-loading',
        text: '加载中...',
        background: 'rgba(0,0,0,0.7)'
    })
};

function end() {
    loading.close();
}

export function showLoaing() {
    if (loadingCount == 0) {
        start();
    };
    loadingCount++
};

export function hideLoading() {
    loadingCount--;
    if (loadingCount == 0) {
        end()
    }
}

// 计算百分比
export function GetPercent(num, total) {
    /// <summary>
    /// 求百分比
    /// </summary>
    /// <param name="num">当前数</param>
    /// <param name="total">总数</param>
    num = parseFloat(num);
    total = parseFloat(total);
    if (isNaN(num) || isNaN(total)) {
        return "-";
    }
    return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00) + "%";
}