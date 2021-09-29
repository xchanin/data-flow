export class DragItemsTemplates {
    static MENU_TEMPLATES(callback) {
        return [
            {
                ClassList: ['drag-item'],
                DataNode: 'facebook',
                Draggable: true,
                DragAction: callback,
                Id: 'facebook',
                Label: ' Facebook',
                IconClassList: ['fab', 'fa-facebook']
            },
            {
                ClassList: ['drag-item'],
                DataNode: 'slack',
                Draggable: true,
                DragAction: callback,
                Id: 'slack',
                Label: ' Slack receive messages',
                IconClassList: ['fab', 'fa-slack']
            },
            {
                ClassList: ['drag-item'],
                DataNode: 'github',
                Draggable: true,
                DragAction: callback,
                Id: 'slack',
                Label: ' Github Star',
                IconClassList: ['fab', 'fa-github']
            },
            {
                ClassList: ['drag-item'],
                DataNode: 'telegram',
                Draggable: true,
                DragAction: callback,
                Id: 'telegram',
                Label: ' Telegram send message',
                IconClassList: ['fab', 'fa-telegram']
            },
            {
                ClassList: ['drag-item'],
                DataNode: 'aws',
                Draggable: true,
                DragAction: callback,
                Id: 'aws',
                Label: ' AWS',
                IconClassList: ['fab', 'fa-aws']
            },
            {
                ClassList: ['drag-item'],
                DataNode: 'log',
                Draggable: true,
                DragAction: callback,
                Id: 'log',
                Label: ' File Log',
                IconClassList: ['fas', 'fa-file-signature']
            },
            {
                ClassList: ['drag-item'],
                DataNode: 'google',
                Draggable: true,
                DragAction: callback,
                Id: 'google',
                Label: ' Google Drive save',
                IconClassList: ['fab', 'fa-google-drive']
            },
            {
                ClassList: ['drag-item'],
                DataNode: 'email',
                Draggable: true,
                DragAction: callback,
                Id: 'email',
                Label: ' Email',
                IconClassList: ['fas', 'fa-at']
            },
            {
                ClassList: ['drag-item'],
                DataNode: 'template',
                Draggable: true,
                DragAction: callback,
                Id: 'template',
                Label: ' Template',
                IconClassList: ['fas', 'fa-code']
            },
            {
                ClassList: ['drag-item'],
                DataNode: 'multiple',
                Draggable: true,
                DragAction: callback,
                Id: 'multiple',
                Label: ' Multiple',
                IconClassList: ['fas', 'fa-code-branch']
            },
            {
                ClassList: ['drag-item'],
                DataNode: 'personalized',
                Draggable: true,
                DragAction: callback,
                Id: 'personalized',
                Label: ' Personalized',
                IconClassList: ['fas', 'fa-fill']
            },
            {
                ClassList: ['drag-item'],
                DataNode: 'dbclick',
                Draggable: true,
                DragAction: callback,
                Id: 'dbclick',
                Label: ' DBClick!',
                IconClassList: ['fas', 'fa-mouse']
            }
        ];
    }
    static FLOW_DRAG_ITEMS(callback) {
        return [
            {
                ClassList: ['drag-item'],
                DataNode: 'request',
                Draggable: true,
                DragAction: callback,
                Id: 'request',
                Label: ' Request',
                IconClassList: ['fab', 'fa-facebook']
            },
            {
                ClassList: ['drag-item'],
                DataNode: 'project',
                Draggable: true,
                DragAction: callback,
                Id: 'project',
                Label: ' Project',
                IconClassList: ['fab', 'fa-facebook']
            },
            {
                ClassList: ['drag-item'],
                DataNode: 'filter',
                Draggable: true,
                DragAction: callback,
                Id: 'filter',
                Label: ' Route Filter',
                IconClassList: ['fab', 'fa-facebook']
            },
            {
                ClassList: ['drag-item'],
                DataNode: 'application',
                Draggable: true,
                DragAction: callback,
                Id: 'application',
                Label: ' Application',
                IconClassList: ['fab', 'fa-facebook']
            },
            {
                ClassList: ['drag-item'],
                DataNode: 'modifier',
                Draggable: true,
                DragAction: callback,
                Id: 'modifier',
                Label: ' DFS Modifier',
                IconClassList: ['fab', 'fa-facebook']
            },
            {
                ClassList: ['drag-item'],
                DataNode: 'join',
                Draggable: true,
                DragAction: callback,
                Id: 'join',
                Label: ' Join',
                IconClassList: ['fab', 'fa-facebook']
            },
            {
                ClassList: ['drag-item'],
                DataNode: 'split',
                Draggable: true,
                DragAction: callback,
                Id: 'split',
                Label: ' Split',
                IconClassList: ['fab', 'fa-facebook']
            },
            {
                ClassList: ['drag-item'],
                DataNode: 'decision',
                Draggable: true,
                DragAction: callback,
                Id: 'decision',
                Label: ' Decision',
                IconClassList: ['fab', 'fa-facebook']
            },
            {
                ClassList: ['drag-item'],
                DataNode: 'event',
                Draggable: true,
                DragAction: callback,
                Id: 'event',
                Label: ' Event',
                IconClassList: ['fab', 'fa-facebook']
            }
        ];
    }
}
