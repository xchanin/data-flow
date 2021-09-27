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
                                {
                                    "node":"1",
                                    "input":"output_1"
                                }
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

    public static HOME_MODULE_DATA: DataFlowDataModel = {
        Module: 'Home',
        Data: [
            {
                ID:'1',
                Name:"welcome",
                Data:{},
                ClassList: ["welcome"],
                HTML:"\n    <div>\n      <div class=\"title-box\">👏 Welcome!!</div>\n      <div class=\"box\">\n        <p>Simple flow library <b>demo</b>\n        <a href=\"https://github.com/jerosoler/Drawflow\" target=\"_blank\">Drawflow</a> by <b>Jero Soler</b></p><br>\n\n        <p>Multiple input / outputs<br>\n           Data sync nodes<br>\n           Import / export<br>\n           Modules support<br>\n           Simple use<br>\n           Type: Fixed or Edit<br>\n           Events: view console<br>\n           Pure Javascript<br>\n        </p>\n        <br>\n        <p><b><u>Shortkeys:</u></b></p>\n        <p>🎹 <b>Delete</b> for remove selected<br>\n        💠 Mouse Left Click == Move<br>\n        ❌ Mouse Right == Delete Option<br>\n        🔍 Ctrl + Wheel == Zoom<br>\n        📱 Mobile support<br>\n        ...</p>\n      </div>\n    </div>\n    ", 
                TypeNode: false, 
                NumOfInputs: 0, 
                NumOfOutputs: 1, 
                Inputs:[],
                Outputs:[],
                PosX:50,
                PosY:50
            },
            {
                ID:'2',
                Name:"slack",
                Data:{},
                ClassList:["slack"],
                HTML: NodeTemplates.Slack, 
                TypeNode: false, 
                NumOfInputs: 0, 
                NumOfOutputs: 1, 
                Inputs:
                {
                    "input_1":
                    {
                        "Connections":
                        [
                            {"node":"9","input":"output_1"}
                        ]
                    }
                },
                Outputs:{
                    "output_1":
                    {
                        "Connections":[]
                    }
                },
                PosX:1028,
                PosY:87
            },
            {
                ID:'3',
                Name:"telegram",
                Data:
                {
                    "channel":"channel_2"
                },
                ClassList:["telegram"],
                HTML:NodeTemplates.Telegram,
                TypeNode: false, 
                Inputs:
                {
                    "input_1":
                    {
                        "Connections":
                        [
                            {"node":"7","input":"output_1"}
                        ]
                    }
                },
                NumOfInputs: 0, 
                NumOfOutputs: 1, 
                Outputs:{
                    "output_1":
                    {
                        "Connections":[]
                    }
                },
                PosX:1032,
                PosY:184
                },
            {
                ID:'4',
                Name:"email",
                Data:{},
                ClassList:["email"],
                HTML:NodeTemplates.Email,
                TypeNode: false, 
                Inputs:
                {
                    "input_1":
                    {
                        "Connections":
                        [
                            {"node":"5","input":"output_1"} // input from template
                        ]
                    }
                },
                Outputs:{
                    "output_1":
                    {
                        "Connections":[]
                    }
                },
                NumOfInputs: 0, 
                NumOfOutputs: 1, 
                PosX:1033,
                PosY:439
            },
            {
                ID:'5',
                Name:"template",
                Data:
                {
                    "template":"Write your template"
                },
                ClassList:["template"],
                HTML:NodeTemplates.Template, 
                TypeNode: false, 
                NumOfInputs: 0, 
                NumOfOutputs: 1, 
                Inputs:
                {
                    "input_1":
                    {
                        "Connections":[
                            {"node":"8","input":"output_1"} // input from template
                        ]
                    }
                },
                Outputs:
                {
                    "output_1":
                    {
                        "Connections":
                        [
                            { "node":"4","output":"input_1" }, // output to email
                            { "node":"11","output":"input_1" } // output to log file
                        ]
                    }
                },
                PosX:298,
                PosY:500
                },
                {
                    ID:'6',
                    Name:"github",
                    Data:
                    {
                        "name":"https://github.com/jerosoler/Drawflow"
                    },
                    ClassList:["github"],
                    HTML:NodeTemplates.Github, 
                    TypeNode: false, 
                    NumOfInputs: 0, 
                    NumOfOutputs: 1, 
                    Inputs:{
                        "input_1":
                        {
                            "Connections":[]
                        }
                    },
                    Outputs:
                    {
                        "output_1":
                        {
                            "Connections":
                            [
                                {"node":"5","output":"input_1"}
                            ]
                        }
                    },
                    PosX:295,
                    PosY:50
                },
                {
                   ID:'7',
                    Name:"facebook",
                    Data:{},
                    ClassList:["facebook"],
                    HTML: NodeTemplates.Facebook, 
                    TypeNode: false, 
                    NumOfInputs: 0, 
                    NumOfOutputs: 1, 
                    Inputs:{
                        "input_1":
                        {
                            "Connections":[]
                        }
                    },
                    Outputs:
                    {
                        "output_1":
                        {
                            "Connections":
                            [
                                {"node": "9", "output": "input_1"},
                                {"node":"3","output":"input_1"},
                                {"node":"11","output":"input_1"}
                            ]
                        }
                    },
                    PosX:500,
                    PosY:87},
                {
                    ID:'8',
                    Name:"diamondTest",
                    Data:{},
                    ClassList:[""],
                    HTML:"\n<div>\n<div>DDD</div>\n</div>\n", 
                    TypeNode: false, 
                    NumOfInputs: 0, 
                    NumOfOutputs: 1, 
                    Inputs:
                    {
                        "input_1":
                        {
                            "Connections":[{"node":"6","input":"output_1"}] // input connection from github
                        }
                    },
                    Outputs:
                    {
                        "output_1":{
                            "Connections": []
                        } // seems to need at least an empty output to show the output marker
                    },
                    PosX:350,
                    PosY:350
                },
                {
                    ID:'9',
                    Name:"circleTest",
                    Data:{},
                    ClassList:[""],
                    HTML:"\n<div>\n<div>circle</div>\n</div>\n", 
                    TypeNode: false, 
                    NumOfInputs: 0, 
                    NumOfOutputs: 1, 
                    Inputs:{
                      "input_1":
                        {
                            "Connections":[{"node":"7","input":"output_1"}] 
                        }
                    },
                    Outputs:{
                      "output_1":
                        {
                            "Connections":
                            [
                                {"node":"2","output":"input_1"}
                            ]
                        }
                    },
                    PosX:700,
                    PosY:75
                },
                {
                    ID:'11',
                    Name:"log",
                    Data:{},
                    ClassList:["log"],
                    HTML:NodeTemplates.Log, 
                    TypeNode: false, 
                    NumOfInputs: 0, 
                    NumOfOutputs: 1, 
                    Inputs:
                    {
                        "input_1":
                        {
                            "Connections":
                            [
                                {"node":"5","input":"output_1"},
                                {"node":"7","input":"output_1"}
                            ]
                        }
                    },
                    Outputs:
                    {
                        "output_1":
                    {
                        "Connections":[]
                    }
                    },
                    
                    PosX:1131,
                    PosY:600
                }
                
        ]    

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
    }

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