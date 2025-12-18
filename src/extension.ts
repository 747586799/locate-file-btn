import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    // --- 部分 1: 注册定位按钮命令 (之前的代码) ---
    let disposable = vscode.commands.registerCommand('locate-file-btn.locate', () => {
        vscode.commands.executeCommand('workbench.files.action.showActiveFileInExplorer');
    });
    context.subscriptions.push(disposable);


    // --- 部分 2: 自动关闭 Auto Reveal (新增代码) ---
    disableAutoReveal();
}

/**
 * 检查并关闭 explorer.autoReveal 设置
 */
async function disableAutoReveal() {
    try {
        // 获取 'explorer' 相关的配置
        const config = vscode.workspace.getConfiguration('explorer');
        
        // 获取当前 autoReveal 的值
        const currentSetting = config.get('autoReveal');

        // 如果当前不是 false (即开启状态或 focusNoScroll 状态)，则将其关闭
        if (currentSetting !== false) {
            
            // update 方法参数说明：
            // 参数 1: 配置项名称
            // 参数 2: 新的值 (false 表示关闭)
            // 参数 3: 修改范围 (ConfigurationTarget.Global 代表修改“用户设置”，即全局生效)
            await config.update('autoReveal', false, vscode.ConfigurationTarget.Global);
            
            // 可选：右下角提示用户已自动修改
            vscode.window.showInformationMessage('已为您自动关闭“资源管理器自动定位” (Auto Reveal)，以配合手动定位按钮使用。');
        }
    } catch (error) {
        console.error('修改配置失败:', error);
    }
}

export function deactivate() {}