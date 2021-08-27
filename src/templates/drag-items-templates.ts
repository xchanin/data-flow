export class DragItemsTemplates {

     public static MENU_TEMPLATES(callback: () => {}): Array<any> {
        return [
            {
                ClassList: ['drag-drawflow'],
                DataNode: 'facebook',
                Draggable: true,
                DragAction: callback,
                Id: 'facebook',
                Label: ' Facebook',
                IconClassList: ['fab', 'fa-facebook']
            },
            {
                ClassList: ['drag-drawflow'],
                DataNode: 'slack',
                Draggable: true,
                DragAction: callback,
                Id: 'slack',
                Label: ' Slack receive messages',
                IconClassList: ['fab', 'fa-slack']
            },
            {
                ClassList: ['drag-drawflow'],
                DataNode: 'github',
                Draggable: true,
                DragAction: callback,
                Id: 'slack',
                Label: ' Github Star',
                IconClassList: ['fab', 'fa-github']
            },
            {
                ClassList: ['drag-drawflow'],
                DataNode: 'telegram',
                Draggable: true,
                DragAction: callback,
                Id: 'telegram',
                Label: ' Telegram send message',
                IconClassList: ['fab', 'fa-telegram']
            },
            {
                ClassList: ['drag-drawflow'],
                DataNode: 'aws',
                Draggable: true,
                DragAction: callback,
                Id: 'aws',
                Label: ' AWS',
                IconClassList: ['fab', 'fa-aws']
            },
            {
                ClassList: ['drag-drawflow'],
                DataNode: 'log',
                Draggable: true,
                DragAction: callback,
                Id: 'log',
                Label: ' File Log',
                IconClassList: ['fas', 'fa-file-signature']
            },
            {
                ClassList: ['drag-drawflow'],
                DataNode: 'google',
                Draggable: true,
                DragAction: callback,
                Id: 'google',
                Label: ' Google Drive save',
                IconClassList: ['fab', 'fa-google-drive']
            },
            {
                ClassList: ['drag-drawflow'],
                DataNode: 'email',
                Draggable: true,
                DragAction: callback,
                Id: 'email',
                Label: ' Email',
                IconClassList: ['fas', 'fa-at']
            },
            {
                ClassList: ['drag-drawflow'],
                DataNode: 'template',
                Draggable: true,
                DragAction: callback,
                Id: 'template',
                Label: ' Template',
                IconClassList: ['fas', 'fa-code']
            },
            {
                ClassList: ['drag-drawflow'],
                DataNode: 'multiple',
                Draggable: true,
                DragAction: callback,
                Id: 'multiple',
                Label: ' Multiple',
                IconClassList: ['fas', 'fa-code-branch']
            },
            {
                ClassList: ['drag-drawflow'],
                DataNode: 'personalized',
                Draggable: true,
                DragAction: callback,
                Id: 'personalized',
                Label: ' Personalized',
                IconClassList: ['fas', 'fa-fill']
            },
            {
                ClassList: ['drag-drawflow'],
                DataNode: 'dbclick',
                Draggable: true,
                DragAction: callback,
                Id: 'dbclick',
                Label: ' DBClick!',
                IconClassList: ['fas', 'fa-mouse']
            }
        ];
     } 
}