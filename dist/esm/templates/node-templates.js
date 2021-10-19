export class NodeTemplates {
}
NodeTemplates.Request = `
            <div class="node-drop-shadow">
                <div class="request">
                    <span>Request</span>
                </div>
            </div>
        `;
NodeTemplates.Project = `
            <div class="node-drop-shadow">
                <div class="project">
                    <span>Project</span>
                </div>
            </div>
        `;
NodeTemplates.Filter = `
            <div class="node-drop-shadow">
                <div class="filter">
                    <span>Filter</span>
                </div>
            </div>
        `;
NodeTemplates.Application = `
            <div class="node-drop-shadow">
                <div class="application">
                    <span>Application</span>
                </div>
            </div>
        `;
NodeTemplates.Modifier = `
            <div class="node-drop-shadow">
                <div class="modifier">
                    <span>Modifier</span>
                </div>
            </div>
        `;
NodeTemplates.Join = `   
            <div class="node-drop-shadow">
                <div class="join">
                    <span>Join</span>
                </div>
            </div>
        `;
NodeTemplates.Split = `
            <div class="node-drop-shadow">
                <div class="split">
                    <span>Split</span>
                </div>
            </div>
        `;
NodeTemplates.Decision = `
            <div class="node-drop-shadow">
                <div class="decision">  
                    <span>Decision</span>
                </div>
            </div>
        `;
NodeTemplates.Event = `
            <div class="node-drop-shadow">
                <div class="event">
                    <span>Event</span>
                </div>
            </div>
        `;
NodeTemplates.Facebook = `
            <div>
                <div class="title-box"><i class="fab fa-facebook"></i> Facebook Messages</div>
            </div>
        `;
NodeTemplates.Slack = `
            <div>
                <div class="title-box"><i class="fab fa-slack"></i> Slack chat message</div>
            </div>
        `;
NodeTemplates.Github = `
            <div>
            <div class="title-box"><i class="fab fa-github "></i> Github Stars</div>
            <div class="box">
                <p>Enter repository url</p>
            <input type="text" df-name>
            </div>
            </div>
        `;
NodeTemplates.Telegram = `
            <div>
                <div class="title-box"><i class="fab fa-telegram-plane"></i> Telegram</div>
                <div class="box">
                    <p>Send to telegram</p>
                    <p>select channel</p>
                    <select df-channel>
                    <option value="channel_1">Channel 1</option>
                    <option value="channel_2">Channel 2</option>
                    <option value="channel_3">Channel 3</option>
                    <option value="channel_4">Channel 4</option>
                    </select>
                </div>
            </div>
        `;
NodeTemplates.AWS = `
            <div>
                <div class="title-box"><i class="fab fa-aws"></i> Aws Save </div>
                <div class="box">
                    <p>Save in aws</p>
                    <input type="text" df-db-dbname placeholder="DB name"><br><br>
                    <input type="text" df-db-key placeholder="DB key">
                    <p>Output Log</p>
                </div>
            </div>
        `;
NodeTemplates.Log = `
            <div>
                <div class="title-box"><i class="fas fa-file-signature"></i> Save log file </div>
            </div>
        `;
NodeTemplates.Google = `
            <div>
                <div class="title-box"><i class="fab fa-google-drive"></i> Google Drive save </div>
            </div>
        `;
NodeTemplates.Email = `
            <div>
                <div class="title-box"><i class="fas fa-at"></i> Send Email </div>
            </div>
        `;
NodeTemplates.Template = `
        <div>
            <div class="title-box"><i class="fas fa-code"></i> Template</div>
            <div class="box">
                Ger Vars
                <textarea df-template></textarea>
                Output template with vars
            </div>
        </div>
        `;
NodeTemplates.Multiple = `
        <div>
            <div class="box">
                Multiple!
            </div>
        </div>
        `;
NodeTemplates.Personalized = `
        <div>
            Personalized
        </div>
        `;
NodeTemplates.DBLClick = `
            <div>
                <div class="title-box"><i class="fas fa-mouse"></i> Db Click</div>
                <div class="box dbclickbox" ondblclick="showPopup(event)">
                    Db Click here
                    <div class="modal" style="display:none">
                    <div class="modal-content">
                        <span class="close" onclick="closeModal(event)">&times;</span>
                        Change your variable {name} !
                        <input type="text" df-name>
                    </div>

                    </div>
                </div>
            </div>
        `;
