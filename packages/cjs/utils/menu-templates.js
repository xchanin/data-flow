"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuTemplates = void 0;
class MenuTemplates {
    static Render(el, menuTemplates) {
        for (let item of menuTemplates) {
            const container = document.createElement('div');
            container.setAttribute('draggable', String(item.Draggable));
            container.setAttribute('data-node', item.DataNode);
            container.addEventListener('dragstart', item.DragAction);
            container.classList.add(...item.ClassList);
            const img = document.createElement('i');
            img.classList.add(...item.IconClassList);
            const span = document.createElement('span');
            span.innerHTML = item.Label;
            container.appendChild(img);
            img.appendChild(span);
            el.appendChild(container);
        }
    }
}
exports.MenuTemplates = MenuTemplates;
/**
 *   <div class="drag-item" draggable="true" ondragstart="drag(event)" data-node="facebook">
        <i class="fab fa-facebook"></i><span> Facebook</span>
    </div>
*/ 
