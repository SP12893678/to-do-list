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
                                                <v-col
                                                    class="pa-1"
                                                    v-for="item in getIconList"
                                                    :key="item"
                                                >
                                                    <v-btn
                                                        @click="selectIcon(item)"
                                                        :color="category_menu.color"
                                                        icon
                                                    >
                                                        <v-icon
                                                            :color="category_menu.color"
                                                        >{{'mdi-' + item}}</v-icon>
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

                <v-list-item-group class="mt-2" mandatory>
                    <v-list-item dense v-for="category in categories" :key="category">
                        <v-list-item-icon class="ml-4 mr-4">
                            <v-icon :color="category.icon_color">{{category.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{category.text}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
        <v-system-bar height="30" class="ma-0 pa-0" app>
            <title-bar></title-bar>
        </v-system-bar>
        <v-main>
            <v-list>
                <v-list-item>
                    <v-list-item-title>To-Do-List</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-main>
    </v-app>
</template>

<script>
import TitleBar from "./TitleBar.vue";
import electron from "electron";
import Icon_names from "../assets/json/mdi-icon.json";

const { remote } = require("electron");
const { BrowserWindow, dialog } = remote;

export default {
    components: {
        TitleBar,
    },
    data() {
        return {
            categories: [
                {
                    icon: "mdi-home",
                    icon_color: "rgba(249,138,48,1)",
                    text: "Home",
                },
                {
                    icon: "mdi-calendar-today",
                    icon_color: "rgba(121,182,141,1)",
                    text: "Today",
                },
                {
                    icon: "mdi-school",
                    icon_color: "rgba(166,48,249,1)",
                    text: "School",
                },
            ],
            category_menu: {
                menu: false,
                tabs: 0,
                text: "",
                color: "",
                icon: "home",
            },
            icon_names: Icon_names,
            icon_pages: 1,
        };
    },
    mounted() {
        console.log("app.vue");
    },
    methods: {
        test() {},
        addCategory() {
            let category = {
                text: this.category_menu.text,
                icon: "mdi-" + this.category_menu.icon,
                icon_color: this.category_menu.color,
            };
            this.categories.push(category);
            this.category_menu.menu = false;
        },
        selectIcon(name) {
            this.category_menu.icon = name;
        },
    },
    computed: {
        getIconList() {
            let app = this;
            let show_counts = 25;
            let icon = this.icon_names.filter((i, index) => {
                return (
                    index < show_counts * app.icon_pages &&
                    index >= show_counts * (app.icon_pages - 1)
                );
            });
            return icon;
        },
        getPaginationPages() {
            return Math.ceil(this.icon_names.length / 25);
        },
    },
};
</script>

<style scoped></style>
