<template>
    <v-app id="inspire">
        <!-- <v-container fluid fill-height> -->
        <v-navigation-drawer color="rgba(250,250,250,1)" clipped app permanent width="280">
            <v-list nav class="py-0">
                <v-list-item class="mb-0" two-line>
                    <v-list-item-content>
                        <v-list-item-title>分類清單</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-menu
                            v-model="category_menu.menu"
                            :close-on-content-click="false"
                            nudge-width="300"
                            max-width="300"
                            offset-y
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn v-bind="attrs" v-on="on" icon>
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </template>

                            <v-card>
                                <v-tabs v-model="category_menu.tabs" grow>
                                    <v-tab>Text</v-tab>
                                    <v-tab>Icon</v-tab>
                                    <v-tab>Color</v-tab>
                                </v-tabs>
                                <v-tabs-items v-model="category_menu.tabs">
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text>
                                                <v-text-field
                                                    v-model="category_menu.text"
                                                    label="請輸入該分類名稱"
                                                    :rules="[(v) => !!v || '必填!']"
                                                ></v-text-field>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text>
                                                <v-color-picker v-model="category_menu.color" flat></v-color-picker>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-pagination
                                            v-model="icon_pages"
                                            :length="getPaginationPages"
                                            circle
                                        ></v-pagination>
                                        <v-btn-toggle class="ma-0 pa-0">
                                            <v-row class="mr-0 ml-0">
                                                <v-col class="pa-1" v-for="item in getIconList" :key="item">
                                                    <v-btn @click="selectIcon(item)" :color="category_menu.color" icon>
                                                        <v-icon :color="category_menu.color">
                                                            {{ 'mdi-' + item }}
                                                        </v-icon>
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-btn-toggle>
                                    </v-tab-item>
                                </v-tabs-items>
                                <v-card-actions>
                                    <v-btn @click="addCategory" color="light-blue" text block>
                                        <v-icon>mdi-check-circle-outline</v-icon>確認
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-menu>
                    </v-list-item-action>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item-group v-model="category" class="mt-2" mandatory>
                    <v-list-item dense v-for="(category, index) in categories" :key="category">
                        <v-list-item-icon class="ml-4 mr-4">
                            <v-icon :color="category.icon_color">{{ category.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{ category.text }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action class="ma-0 pa-0">
                            <v-btn @click="deleteCategory(index)" icon>
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
        <v-system-bar height="30" class="ma-0 pa-0" app>
            <title-bar></title-bar>
        </v-system-bar>
        <v-main>
            <v-list class="ml-6 mt-6">
                <v-list-item class="mb-4" two-line>
                    <v-list-item-content class="pb-0 pt-0 mb-0 category-title font-weight-bold">
                        {{ categories[category].text }}
                    </v-list-item-content>

                    <v-text-field
                        v-model="search"
                        class="pt-0"
                        append-icon="mdi-magnify"
                        label="搜尋"
                        single-line
                        hide-details
                    ></v-text-field>
                    <!-- <v-list-item-action class="mb-0">
                        <v-btn text>
                            <v-icon>mdi-plus</v-icon>新增
                        </v-btn>
                    </v-list-item-action>-->
                </v-list-item>

                <v-list-item-group dense>
                    <v-menu
                        v-model="task_menu.menu"
                        :close-on-content-click="false"
                        nudge-width="400"
                        max-width="400"
                        offset-y
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-list-item @click="task_menu.type = 'add'" v-bind="attrs" v-on="on">
                                <v-icon>mdi-plus</v-icon>增加任務
                            </v-list-item>
                        </template>
                        <v-form ref="task_menu">
                            <v-card class="pa-4">
                                <v-card-text>
                                    <v-text-field
                                        v-model="task_menu.title"
                                        :rules="[(v) => !!v || '必填!']"
                                        class="mb-4"
                                        label="任務標題"
                                    ></v-text-field>
                                    <v-textarea
                                        v-model="task_menu.description"
                                        clearable
                                        clear-icon="mdi-close"
                                        label="任務描述"
                                        height="80"
                                    ></v-textarea>
                                    <v-select
                                        v-model="task_menu.category"
                                        :rules="[(v) => !!v || '必填!']"
                                        :items="categories"
                                        label="類別"
                                        hide-details
                                    ></v-select>
                                    <v-row align="center">
                                        <v-col cols="10">
                                            <v-text-field v-model="task_menu.date" readonly hide-details></v-text-field>
                                        </v-col>
                                        <v-col class="pa-0" cols="1">
                                            <v-menu
                                                top
                                                :close-on-content-click="false"
                                                nudge-width="300"
                                                max-width="300"
                                                offset-y
                                            >
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn icon v-bind="attrs" v-on="on">
                                                        <v-icon>mdi-calendar-month-outline</v-icon>
                                                    </v-btn>
                                                </template>
                                                <v-card>
                                                    <v-card-text>
                                                        <v-date-picker v-model="task_menu.date"></v-date-picker>
                                                    </v-card-text>
                                                </v-card>
                                            </v-menu>
                                        </v-col>
                                    </v-row>
                                    <v-select
                                        v-model="task_menu.notfiy"
                                        :items="task_menu.notfiy_option"
                                        :menu-props="{ maxHeight: '400' }"
                                        label="提醒時間"
                                        multiple
                                        persistent-hint
                                        hide-details
                                    ></v-select>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn
                                        v-if="task_menu.type == 'add'"
                                        class="mt-8"
                                        @click="addTask"
                                        color="light-blue"
                                        text
                                        block
                                    >
                                        <v-icon>mdi-check-circle-outline</v-icon>添加
                                    </v-btn>
                                    <v-btn
                                        v-if="task_menu.type == 'edit'"
                                        class="mt-8"
                                        @click="saveTask"
                                        color="light-blue"
                                        text
                                        block
                                    >
                                        <v-icon>mdi-save</v-icon>儲存
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-form>
                    </v-menu>
                </v-list-item-group>

                <v-list-item dense v-for="(item, index) in getCategoryTasks" :key="index">
                    <v-list-item-content class="pa-0 ma-0">
                        <v-checkbox
                            v-model="item.complete"
                            :class="item.complete ? 'line_m ml-4 mb-0 mt-0' : 'ml-4 mb-0 mt-0'"
                            :label="item.title"
                            color="red"
                            hide-details
                        ></v-checkbox>
                    </v-list-item-content>
                    <v-list-item-content class="pa-0 ma-0">
                        {{ item.date }}
                    </v-list-item-content>

                    <v-list-item-action class="mb-0 mt-0">
                        <v-btn @click="showEditTaskMenu(index)" icon>
                            <v-icon>mdi-circle-edit-outline</v-icon>
                        </v-btn>
                    </v-list-item-action>
                    <v-list-item-action class="mb-0 mt-0">
                        <v-btn @click="deleteTask(index)" icon>
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
        </v-main>
    </v-app>
</template>

<script>
import TitleBar from './TitleBar.vue'
import electron from 'electron'
import Icon_names from '../assets/json/mdi-icon.json'

const { remote } = require('electron')
const { BrowserWindow, dialog, session } = remote

export default {
    components: {
        TitleBar,
    },
    data() {
        return {
            categories: [
                {
                    icon: 'mdi-home',
                    icon_color: 'rgba(249,138,48,1)',
                    text: 'Home',
                },
                {
                    icon: 'mdi-calendar-today',
                    icon_color: 'rgba(121,182,141,1)',
                    text: 'Today',
                },
                {
                    icon: 'mdi-school',
                    icon_color: 'rgba(166,48,249,1)',
                    text: 'School',
                },
            ],
            category_menu: {
                menu: false,
                tabs: 0,
                text: '',
                color: '',
                icon: 'home',
            },
            icon_names: Icon_names,
            icon_pages: 1,
            category: 0,
            tasks: [],
            task_menu: {
                menu: false,
                date: new Date().toISOString().substr(0, 10),
                notfiy_option: ['半小時前', '一天前'],
                notfiy: [],
                title: '',
                description: '',
                category: '',
                type: 'add',
                index: -1,
            },
            search: '',
        }
    },
    mounted() {
        console.log('app.vue')
        console.log(session)
        // console.log(new Date().toString());

        // const cookie = {
        //     url: "http://www.github.com",
        //     name: "dummy_name",
        //     value: "dummy",
        // };
        // session.defaultSession.cookies.set(cookie);

        // session.defaultSession.cookies
        //     .get({})
        //     .then((cookies) => {
        //         console.log(cookies);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        // let categories = [
        //     {
        //         icon: "mdi-school",
        //         icon_color: "rgba(166,48,249,1)",
        //         text: "School",
        //     },
        //     {
        //         icon: "mdi-calendar-today",
        //         icon_color: "rgba(121,182,141,1)",
        //         text: "Today",
        //     },
        //     {
        //         icon: "mdi-home",
        //         icon_color: "rgba(249,138,48,1)",
        //         text: "Home",
        //     },
        // ];
        // const cookie = {
        //     url: "http://127.0.0.1",
        //     name: "category_menu",
        //     value: JSON.stringify(categories),
        // };
        // session.defaultSession.cookies.set(cookie);
        /**取得seesion 分類清單 */
        session.defaultSession.cookies
            .get({ name: 'category_menu' })
            .then((cookies) => {
                console.log(cookies)
                if (cookies.length == 0) return
                this.categories = JSON.parse(cookies[0].value)
            })
            .catch((error) => {
                console.log(error)
            })
        /**取得seesion 任務清單 */
        session.defaultSession.cookies
            .get({ name: 'tasks' })
            .then((cookies) => {
                console.log(cookies)
                if (cookies.length == 0) return
                this.tasks = JSON.parse(cookies[0].value)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    methods: {
        test() {},
        deleteCategory(index) {
            this.categories.splice(index, 1)
            const cookie = {
                url: 'http://127.0.0.1',
                name: 'category_menu',
                value: JSON.stringify(this.categories),
                expirationDate: new Date().getTime() + 30 * 24 * 3600 * 1000,
            }
            session.defaultSession.cookies.set(cookie)
        },
        addCategory() {
            let category = {
                text: this.category_menu.text,
                icon: 'mdi-' + this.category_menu.icon,
                icon_color: this.category_menu.color,
            }
            this.categories.push(category)
            this.category_menu.menu = false

            const cookie = {
                url: 'http://127.0.0.1',
                name: 'category_menu',
                value: JSON.stringify(this.categories),
                expirationDate: new Date().getTime() + 30 * 24 * 3600 * 1000,
            }
            session.defaultSession.cookies.set(cookie)
        },
        selectIcon(name) {
            this.category_menu.icon = name
        },
        addTask() {
            if (!this.$refs.task_menu.validate()) return
            console.log(this.task_menu)
            let { title, description, date, category, notfiy } = this.task_menu
            let task = {
                title,
                description,
                date,
                category,
                notfiy,
                complete: false,
            }
            this.tasks.push(task)
            this.task_menu.menu = false

            const cookie = {
                url: 'http://127.0.0.1',
                name: 'tasks',
                value: JSON.stringify(this.tasks),
                expirationDate: new Date().getTime() + 30 * 24 * 3600 * 1000,
            }
            session.defaultSession.cookies.set(cookie)
        },
        deleteTask(index) {
            this.tasks.splice(index, 1)
            const cookie = {
                url: 'http://127.0.0.1',
                name: 'tasks',
                value: JSON.stringify(this.tasks),
                expirationDate: new Date().getTime() + 30 * 24 * 3600 * 1000,
            }
            session.defaultSession.cookies.set(cookie)
        },
        showEditTaskMenu(index) {
            let { title, description, date, category, notfiy } = this.tasks[index]
            Object.assign(this.task_menu, { title, description, date, category, notfiy, index })
            this.task_menu.type = 'edit'
            this.task_menu.menu = true
        },
        saveTask() {
            let { title, description, date, category, notfiy, index } = this.task_menu

            Object.assign(this.tasks[index], { title, description, date, category, notfiy })

            const cookie = {
                url: 'http://127.0.0.1',
                name: 'tasks',
                value: JSON.stringify(this.tasks),
                expirationDate: new Date().getTime() + 30 * 24 * 3600 * 1000,
            }
            session.defaultSession.cookies.set(cookie)

            this.task_menu.menu = false
        },
    },
    computed: {
        getIconList() {
            let app = this
            let show_counts = 25
            let icon = this.icon_names.filter((i, index) => {
                return index < show_counts * app.icon_pages && index >= show_counts * (app.icon_pages - 1)
            })
            return icon
        },
        getPaginationPages() {
            return Math.ceil(this.icon_names.length / 25)
        },
        getCategoryTasks() {
            let app = this
            let tasks = this.tasks.filter((item) => {
                return (
                    item.category == app.categories[app.category].text &&
                    (item.title.indexOf(app.search) >= 0 ||
                        item.description.indexOf(app.search) >= 0 ||
                        item.date.indexOf(app.search) >= 0)
                )
            })
            return tasks
        },
    },
}
</script>

<style scoped>
.category-title {
    font-size: 24px;
}
.line_m {
    text-decoration: line-through;
}
</style>
