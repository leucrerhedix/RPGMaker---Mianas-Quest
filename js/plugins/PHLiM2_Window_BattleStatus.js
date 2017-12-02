//====================================================================
// PHLiM2_Window_BattleStatus.js
//====================================================================
/*:
 * @plugindesc Changes the battle status to something a bit more fancy. Recommended for use with screen resolution of 1280x720.
 * @author PHLiM2
 *
 * @param Status Background
 * @desc Status Background Type [0:Normal/1:Dim/2:Transparent]
 * @default 0
 *
 * @param Command Count
 * @desc Determines the height of the status window using the command window. [Default: 4]
 * @default 4
 * @help I will be adding more to this plugin eventually, such as:
 * - Remove faces if the screen resolution is too small
 * - Enable/disable character sprite for smaller resolutions
 * - Filename extensions for KO'd character faces (ie: Hero1_ko)
 *
 */
//-----------------------------------------------------------------------------
// Window_BattleStatus
//
// The window for displaying the status of party members on the battle screen.


function Window_BattleStatus() {
    this.initialize.apply(this, arguments);
}

Window_BattleStatus.prototype = Object.create(Window_Selectable.prototype);
Window_BattleStatus.prototype.constructor = Window_BattleStatus;
(function() {

    var parameters = PluginManager.parameters('PHLiM2_Window_BattleStatus');
    var statbackground = Number(parameters['Status Background'] || 0);
    var cmdcount = Number(parameters['Command Count'] || 4);

Window_BattleStatus.prototype.initialize = function() {
    var width = this.windowWidth();
    var height = this.windowHeight();
    var x = Graphics.boxWidth - width;
    var y = Graphics.boxHeight - height;
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
    this.openness = 0;
    this.setBackgroundType(statbackground);
};


Window_BattleStatus.prototype.windowWidth = function() {
    return Graphics.boxWidth - 192;
};

Window_BattleStatus.prototype.windowHeight = function() {
    return this.lineHeight() * cmdcount + this.standardPadding() * 2;
};

Window_BattleStatus.prototype.numVisibleRows = function() {
    return 1;
};
Window_BattleStatus.prototype.maxRows = function() {
    return 1;
};
Window_BattleStatus.prototype.numVisibleCols = function() {
    return 4;
};
Window_BattleStatus.prototype.maxCols = function() {
    return 4;
};

Window_BattleStatus.prototype.maxItems = function() {
    return $gameParty.battleMembers().length;
};

Window_BattleStatus.prototype.refresh = function() {
    this.contents.clear();
    this.drawAllItems();
};

Window_BattleStatus.prototype.itemHeight = function(index) {
    return this.contentsHeight();
};
Window_BattleStatus.prototype.drawItem = function(index) {
    var actor = $gameParty.battleMembers()[index];
    this.drawBasicArea(this.basicAreaRect(index), actor);
    this.drawGaugeArea(this.gaugeAreaRect(index), actor);
};

Window_BattleStatus.prototype.basicAreaRect = function(index) {
    var rect = this.itemRectForText(index);
    rect.width = this.gaugeAreaWidth() / 4;
    rect.height = this.contentsHeight();
    return rect;
};

Window_BattleStatus.prototype.gaugeAreaRect = function(index) {
    var rect = this.itemRectForText(index);
    rect.x += rect.width - this.gaugeAreaWidth();
    rect.width = this.gaugeAreaWidth();
    return rect;
};

Window_BattleStatus.prototype.gaugeAreaWidth = function() {
    return 330;
};

Window_BattleStatus.prototype.drawBasicArea = function(rect, actor) {
    this.drawActorFace(actor, rect.x - 4,rect.y);
    this.drawActorName(actor, rect.x + 0, rect.y, 150);
    this.drawActorLevel(actor, rect.x + rect.width * 2, rect.y);
    this.drawActorIcons(actor, rect.x, rect.y + rect.height - 48);
};

Window_BattleStatus.prototype.drawGaugeArea = function(rect, actor) {
    if ($dataSystem.optDisplayTp) {
        this.drawGaugeAreaWithTp(rect, actor);
    } else {
        this.drawGaugeAreaWithoutTp(rect, actor);
    }
};

Window_BattleStatus.prototype.drawGaugeAreaWithTp = function(rect, actor) {
    this.drawActorHp(actor, rect.x + (rect.width - 112), rect.y + this.lineHeight(), 108);
    this.drawActorMp(actor, rect.x + (rect.width - 112), rect.y + this.lineHeight() * 2, 108);
    this.drawActorTp(actor, rect.x + (rect.width - 112), rect.y + this.lineHeight() * 3, 108);
};

Window_BattleStatus.prototype.drawGaugeAreaWithoutTp = function(rect, actor) {
    this.drawActorHp(actor, rect.x + 0, rect.y, 201);
    this.drawActorMp(actor, rect.x + 216,  rect.y, 114);
};
Window_ActorCommand.prototype.initialize = function() {
    var y = Graphics.boxHeight - this.windowHeight();
    Window_Command.prototype.initialize.call(this, 0, y);
    this.openness = 0;
    this.deactivate();
    this._actor = null;
};
Window_ActorCommand.prototype.numVisibleRows = function() {
    return cmdcount;
};
Window_PartyCommand.prototype.numVisibleRows = function() {
    return cmdcount;
};
})();
