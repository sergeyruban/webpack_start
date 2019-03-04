'use strict';

import './button.less';

import template from './button.pug';

export default class Button {
    constructor(options) {
        this.elem = document.createElement('div');
        this.elem.className = 'btn-wrap';

        this.elem.innerHTML = template(options);

        let btn = this.elem.querySelector('.btn');

        btn.onclick = () => alert(options.text);
    }
}
