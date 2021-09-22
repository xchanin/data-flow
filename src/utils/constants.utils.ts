import { DispatchedEventsModel } from './../models/events/dispatched-events.model.js';
import { DataFlowDataModel } from "../models/dataflow-data.model.js";
import { NodeTemplates } from "../templates/node-templates.js";
import { NodeModel } from '../models/nodes/node.model.js';

export class ConstantUtils {

    public static TEST_MODULE: DataFlowDataModel = {
        Module: 'Test',
        Data: [
                {
                    ID: '1',
                    Name: 'one', 
                    NumOfInputs: 0, 
                    NumOfOutputs: 1, 
                    PosX: 50, 
                    PosY: 100, 
                    ClassList: [], 
                    Outputs:
                    {
                        "output_1":
                        {
                            "Connections":
                            [
                                {"node":"2","input":"output_1"}
                            ]
                        }
                    },
                    Data: {'shannon': 'this is a test', 'link': 'http://www.bluepow.com'},
                    HTML: 
                    `
                        <div class="node-drop-shadow">
                            <div class="gap flexbox-row flexbox-base request">
                                <span>Request Test</span>
                                <input type=\"text\" df-shannon>
                                <a href="#" df-link></a>
                            </div>
                        </div>
                    `,
                    TypeNode: false
                },
                {
                    ID: '2',
                    Name: 'two', 
                    NumOfInputs: 0, 
                    NumOfOutputs: 1, 
                    PosX: 250, 
                    PosY: 100, 
                    ClassList: [], 
                    Data: {}, 
                    Inputs:
                    {
                        "input_1":
                        {
                            "Connections":
                            [
                                {"node":"1","input":"output_1"}
                            ]
                        }
                    },
                    HTML: NodeTemplates.Project, // this calls an HTML string
                    TypeNode: false
                },
                // {
                //     ID: '3',
                //     Name: 'three', 
                //     NumOfInputs: 0, 
                //     NumOfOutputs: 1, 
                //     PosX: 50, 
                //     PosY: 100, 
                //     ClassList: [], 
                //     Data: {}, 
                //     HTML: document.getElementById('request').content,
                //     TypeNode: true
                // },

            ]
    };

    // public static HOME_MODULE_DATA: DataFlowDataModel = {
    //     Module: 'Home',
    //     Data: {
    //         "1":
    //         {
    //             "id":1,
    //             "name":"welcome",
    //             "data":{},
    //             "class":"welcome",
    //             "html":"\n    <div>\n      <div class=\"title-box\">👏 Welcome!!</div>\n      <div class=\"box\">\n        <p>Simple flow library <b>demo</b>\n        <a href=\"https://github.com/jerosoler/Drawflow\" target=\"_blank\">Drawflow</a> by <b>Jero Soler</b></p><br>\n\n        <p>Multiple input / outputs<br>\n           Data sync nodes<br>\n           Import / export<br>\n           Modules support<br>\n           Simple use<br>\n           Type: Fixed or Edit<br>\n           Events: view console<br>\n           Pure Javascript<br>\n        </p>\n        <br>\n        <p><b><u>Shortkeys:</u></b></p>\n        <p>🎹 <b>Delete</b> for remove selected<br>\n        💠 Mouse Left Click == Move<br>\n        ❌ Mouse Right == Delete Option<br>\n        🔍 Ctrl + Wheel == Zoom<br>\n        📱 Mobile support<br>\n        ...</p>\n      </div>\n    </div>\n    ", 
    //             "typenode": false, 
    //             "inputs":{},
    //             "outputs":{},
    //             "pos_x":50,
    //             "pos_y":50
    //         },
    //         "2":
    //         {
    //             "id":2,
    //             "name":"slack",
    //             "data":{},
    //             "class":"slack",
    //             "html": NodeTemplates.Slack, 
    //             "typenode": false, 
    //             "inputs":
    //             {
    //                 "input_1":
    //                 {
    //                     "connections":
    //                     [
    //                         {"node":"9","input":"output_1"}
    //                     ]
    //                 }
    //             },"outputs":{},
    //             "pos_x":1028,
    //             "pos_y":87
    //         },
    //         "3":
    //         {
    //             "id":3,
    //             "name":"telegram",
    //             "data":
    //             {
    //                 "channel":"channel_2"
    //             },
    //             "class":"telegram",
    //             "html":NodeTemplates.Telegram,
    //             "typenode": false, 
    //             "inputs":
    //             {
    //                 "input_1":
    //                 {
    //                     "connections":
    //                     [
    //                         {"node":"7","input":"output_1"}
    //                     ]
    //                 }
    //             },
    //             "outputs":{},
    //             "pos_x":1032,
    //             "pos_y":184
    //             },
    //         "4":
    //         {
    //             "id":4,
    //             "name":"email",
    //             "data":{},
    //             "class":"email",
    //             "html":NodeTemplates.Email,
    //             "typenode": false, 
    //             "inputs":
    //             {
    //                 "input_1":
    //                 {
    //                     "connections":
    //                     [
    //                         {"node":"5","input":"output_1"} // input from template
    //                     ]
    //                 }
    //             },
    //             "outputs":{},
    //             "pos_x":1033,
    //             "pos_y":439
    //         },
    //         "5":
    //         {
    //             "id":5,
    //             "name":"template",
    //             "data":
    //             {
    //                 "template":"Write your template"
    //             },
    //             "class":"template",
    //                 "html":NodeTemplates.Template, 
    //         "typenode": false, 
    //         "inputs":
    //         {
    //             "input_1":
    //             {
    //                 "connections":[
    //                     {"node":"8","input":"output_1"} // input from template
    //                 ]
    //             }
    //         },
    //             "outputs":
    //             {
    //                 "output_1":
    //                 {
    //                     "connections":
    //                     [
    //                         { "node":"4","output":"input_1" }, // output to email
    //                         { "node":"11","output":"input_1" } // output to log file
    //                     ]
    //                 }
    //             },
    //             "pos_x":298,
    //             "pos_y":500
    //             },
    //             "6":
    //             {
    //                 "id":6,
    //                 "name":"github",
    //                 "data":
    //                 {
    //                     "name":"https://github.com/jerosoler/Drawflow"
    //                 },
    //                 "class":"github",
    //                 "html":NodeTemplates.Github, 
    //                 "typenode": false, 
    //                 "inputs":{},
    //                 "outputs":
    //                 {
    //                     "output_1":
    //                     {
    //                         "connections":
    //                         [
    //                             {"node":"5","output":"input_1"}
    //                         ]
    //                     }
    //                 },
    //                 "pos_x":295,
    //                 "pos_y":50
    //             },
    //             "7":
    //             {
    //                 "id":7,
    //                 "name":"facebook",
    //                 "data":{},
    //                 "class":"facebook",
    //                 "html": NodeTemplates.Facebook, 
    //                 "typenode": false, 
    //                 "inputs":{},
    //                 "outputs":
    //                 {
    //                     "output_1":
    //                     {
    //                         "connections":
    //                         [
    //                             {"node": "9", "output": "input_1"},
    //                             {"node":"3","output":"input_1"},
    //                             {"node":"11","output":"input_1"}
    //                         ]
    //                     }
    //                 },
    //                 "pos_x":500,
    //                 "pos_y":87},
    //             "8":
    //             {
    //                 "id":8,
    //                 "name":"diamondTest",
    //                 "data":{},
    //                 "class":"",
    //                 "html":"\n<div>\n<div>DDD</div>\n</div>\n", 
    //                 "typenode": false, 
    //                 "inputs":
    //                 {
    //                     "input_1":
    //                     {
    //                         "connections":[{"node":"6","input":"output_1"}] // input connection from github
    //                     }
    //                 },
    //                 "outputs":
    //                 {
    //                     "output_1":{} // seems to need at least an empty output to show the output marker
    //                 },
    //                 "pos_x":350,
    //                 "pos_y":350,
    //                 "shape": "diamond"
    //             },
    //             "9":
    //             {
    //                 "id":9,
    //                 "name":"circleTest",
    //                 "data":{},
    //                 "class":"",
    //                 "html":"\n<div>\n<div>circle</div>\n</div>\n", 
    //                 "typenode": false, 
    //                 "inputs":{
    //                   "input_1":
    //                     {
    //                         "connections":[{"node":"7","input":"output_1"}] 
    //                     }
    //                 },
    //                 "outputs":{
    //                   "output_1":
    //                     {
    //                         "connections":
    //                         [
    //                             {"node":"2","output":"input_1"}
    //                         ]
    //                     }
    //                 },
    //                 "pos_x":700,
    //                 "pos_y":75,
    //                 "shape": "circle"
    //             },
    //             "11":
    //                 {
    //                     "id":11,
    //                     "name":"log",
    //                     "data":{},
    //                     "class":"log",
    //                     "html":NodeTemplates.Log, 
    //                     "typenode": false, 
    //                     "inputs":
    //                     {
    //                         "input_1":
    //                         {
    //                             "connections":
    //                             [
    //                                 {"node":"5","input":"output_1"},
    //                                 {"node":"7","input":"output_1"}
    //                             ]
    //                         }
    //                     },
    //                     "outputs":{},
                        
    //                     "pos_x":1131,
    //                     "pos_y":600
    //                 }
    //             }
    // }    

    // public static OTHER_MODULE_DATA: DataFlowDataModel = {
    //     Module: 'Other',
    //     Data:
    //             {
    //                 "8":
    //                 {
    //                     "id": 8,
    //                     "name": "personalized",
    //                     "data": {},
    //                     "class": "personalized",
    //                     "html": "\n            <div>\n              Personalized\n            </div>\n            ",
    //                     "typenode": false,
    //                     "inputs":
    //                     {
    //                         "input_1":
    //                         {
    //                             "connections":
    //                                 [
    //                                     { "node": "12", "input": "output_1" },
    //                                     { "node": "12", "input": "output_2" },
    //                                     { "node": "12", "input": "output_3" },
    //                                     { "node": "12", "input": "output_4" }
    //                                 ]
    //                         }
    //                     },
    //                     "outputs":
    //                     {
    //                         "output_1":
    //                         {
    //                             "connections":
    //                                 [
    //                                     { "node": "9", "output": "input_1" }
    //                                 ]
    //                         }
    //                     },
    //                     "pos_x": 764,
    //                     "pos_y": 227
    //                 },
    //                 "9":
    //                 {
    //                     "id": 9,
    //                     "name": "dbclick",
    //                     "data":
    //                     {
    //                         "name": "Hello World!!"
    //                     },
    //                     "class": "dbclick",
    //                     "html": "\n            <div>\n            <div class=\"title-box\"><i class=\"fas fa-mouse\"></i> Db Click</div>\n              <div class=\"box dbclickbox\" ondblclick=\"showpopup(event)\">\n                Db Click here\n                <div class=\"modal\" style=\"display:none\">\n                  <div class=\"modal-content\">\n                    <span class=\"close\" onclick=\"closemodal(event)\">&times;</span>\n                    Change your variable {name} !\n                    <input type=\"text\" df-name>\n                  </div>\n\n                </div>\n              </div>\n            </div>\n            ",
    //                     "typenode": false,
    //                     "inputs":
    //                     {
    //                         "input_1":
    //                         {
    //                             "connections":
    //                                 [
    //                                     { "node": "8", "input": "output_1" }
    //                                 ]
    //                         }
    //                     }, "outputs":
    //                     {
    //                         "output_1":
    //                         {
    //                             "connections":
    //                                 [
    //                                     { "node": "12", "output": "input_2" }
    //                                 ]
    //                         }
    //                     },
    //                     "pos_x": 209,
    //                     "pos_y": 38
    //                 },
    //                 "12":
    //                 {
    //                     "id": 12,
    //                     "name": "multiple",
    //                     "data": {},
    //                     "class": "multiple",
    //                     "html": "\n            <div>\n              <div class=\"box\">\n                Multiple!\n              </div>\n            </div>\n            ",
    //                     "typenode": false,
    //                     "inputs":
    //                     {
    //                         "input_1":
    //                         {
    //                             "connections": []
    //                         },
    //                         "input_2":
    //                         {
    //                             "connections":
    //                                 [
    //                                     { "node": "9", "input": "output_1" }
    //                                 ]
    //                         },
    //                         "input_3": {
    //                             "connections": []
    //                         }
    //                     },
    //                     "outputs":
    //                     {
    //                         "output_1":
    //                         {
    //                             "connections":
    //                                 [
    //                                     { "node": "8", "output": "input_1" }
    //                                 ]
    //                         }, "output_2":
    //                         {
    //                             "connections":
    //                                 [
    //                                     { "node": "8", "output": "input_1" }
    //                                 ]
    //                         },
    //                         "output_3":
    //                         {
    //                             "connections":
    //                                 [
    //                                     { "node": "8", "output": "input_1" }
    //                                 ]
    //                         },
    //                         "output_4":
    //                         {
    //                             "connections":
    //                                 [
    //                                     { "node": "8", "output": "input_1" }
    //                                 ]
    //                         }
    //                     },
    //                     "pos_x": 179,
    //                     "pos_y": 272
    //                 }
    //             }
    // }

    public static DISPATCHED_EVENTS: Array<DispatchedEventsModel> = [
        { Event: 'mouseMove', Message: 'Mouse position', Params: ['x','y'] },
        { Event: 'nodeMoved', Message: 'Node moved' },
        { Event: 'nodeCreated', Message: 'Node created' },
        { Event: 'nodeRemoved', Message: 'Node removed' },
        { Event: 'nodeSelected', Message: 'Node selected' },
        { Event: 'moduleCreated', Message: 'Module created' },
        { Event: 'moduleChanged', Message: 'Module Changed' },
        { Event: 'connectionCreated', Message: 'Connection created' },
        { Event: 'zoom', Message: 'Zoom' },
        { Event: 'translate', Message: 'Translate' },
        { Event: 'addReroute', Message: 'Add reroute' },
        { Event: 'removeReroute', Message: 'Remove reroute' }
    ]
}