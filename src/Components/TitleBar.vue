<template>
    <div class="titlebar-container">
        <div class="titlebar">
            <div class="titlebar-drag"></div>
            <div class="window-icon"></div>
            <div class="window-controls-container">
                <div @click="minimize" class="window-control-icon-container">
                    <a-icon class="window-control-icon" name="minus-square"></a-icon>
                </div>
                <div @click="maximize" class="window-control-icon-container">
                    <a-icon class="window-control-icon" name="window-maximize"></a-icon>
                </div>
                <div @click="close" class="window-control-icon-container">
                    <a-icon class="window-control-icon" name="window-close"></a-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import electron from "electron";

const { remote } = require("electron");
const { BrowserWindow } = remote;

export default {
    methods: {
        test() {
            console.log(electron);
            console.log(remote);
            console.log(BrowserWindow);
        },
        minimize() {
            let window = remote.getCurrentWindow();
            window.minimize();
        },
        maximize() {
            let window = remote.getCurrentWindow();
            if (!window.isMaximized()) window.maximize();
            else window.unmaximize();
        },
        close() {
            let window = remote.getCurrentWindow();
            window.close();
        },
    },
};
</script>

<style scoped>
.titlebar-container {
    width: 100%;
    height: 30px;
}
.titlebar {
    background-color: rgb(40, 44, 52);
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    -webkit-user-select: none;
}
.titlebar-drag {
    top: 0;
    left: 0;
    display: block;
    position: absolute;
    width: 100%;
    height: 30px;
    -webkit-app-region: drag;
}
.window-controls-container {
    -webkit-app-region: no-drag;
    height: 100%;
    width: 138px;
    margin-left: auto;
    display: flex;
    text-align: center;
    position: relative;
    justify-content: center;
    align-self: center;
}
.window-control-icon-container {
    display: flex;
    height: 100%;
    width: 46px;
    font-size: 16px;
    color: #b3b3b3;
}

.window-control-icon-container:hover {
    background-color: rgb(255, 255, 255, 0.3);
}
.window-control-icon {
    margin: auto;
}
</style>
