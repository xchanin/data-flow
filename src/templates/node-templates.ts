export class NodeTemplates {

    public static Request: string = `<div class="request">Request</div>`;

    public static Project: string = `<div class="project">Project</div>`;

    public static Filter: string = `<div class="filter">Filter</div>`;

    public static Application: string = `<div class="application">Application</div>`;

    public static Modifier: string = `<div class="modifier">Modifier</div>`;

    public static Join: string = 
        `   <div class="clip-path-parent">
                <div class="join">Join</div>
            </div>
        `;

    public static Split: string = `<div class="split">Split</div>`;

    public static Decision: string = `<div class="decision">Decision</div>`;

    public static Event: string = `<div class="event">Event</div>`;

    public static Facebook: string = 
        `
            <div>
                <div class="title-box"><i class="fab fa-facebook"></i> Facebook Messages</div>
            </div>
        `
    ;

    public static Slack: string = 
        `
            <div>
                <div class="title-box"><i class="fab fa-slack"></i> Slack chat message</div>
            </div>
        `
    ;

    public static Github: string = 
        `
            <div>
            <div class="title-box"><i class="fab fa-github "></i> Github Stars</div>
            <div class="box">
                <p>Enter repository url</p>
            <input type="text" df-name>
            </div>
            </div>
        `
    ;

    public static Telegram: string = 
        `
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
        `
    ;

    public static AWS = 
        `
            <div>
                <div class="title-box"><i class="fab fa-aws"></i> Aws Save </div>
                <div class="box">
                    <p>Save in aws</p>
                    <input type="text" df-db-dbname placeholder="DB name"><br><br>
                    <input type="text" df-db-key placeholder="DB key">
                    <p>Output Log</p>
                </div>
            </div>
        `
    ;

    public static Log = 
        `
            <div>
                <div class="title-box"><i class="fas fa-file-signature"></i> Save log file </div>
            </div>
        `
    ;

    public static Google = 
        `
            <div>
                <div class="title-box"><i class="fab fa-google-drive"></i> Google Drive save </div>
            </div>
        `
    ;

    public static Email = 
        `
            <div>
                <div class="title-box"><i class="fas fa-at"></i> Send Email </div>
            </div>
        `
    ;

    public static Template = 
        `
        <div>
            <div class="title-box"><i class="fas fa-code"></i> Template</div>
            <div class="box">
                Ger Vars
                <textarea df-template></textarea>
                Output template with vars
            </div>
        </div>
        `
    ;

    public static Multiple = 
        `
        <div>
            <div class="box">
                Multiple!
            </div>
        </div>
        `
    ;

    public static Personalized = 
        `
        <div>
            Personalized
        </div>
        `
    ;

    public static DBLClick = 
        `
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
        `
    ;
}