/*:
* @target MZ
* @plugindesc ​v1.0 Censor specific words suitable for a kid-friendly mode.
* @author codapill
*
* @param Kid Mode
* @type Switch
* @desc Turn this switch ON to enable Kid Mode.
* @default 0
*
* @param Words to Censor
* @type Text[]
* @desc List all of the words you wish to censor.
*
* @param Censored Replacement
* @type Text
* @desc What should show instead of the censored words?
* Default: #$%!
* @default #$%!
*
* @help
* ----------------------------------------------------------------------
* KidMode v1.0 by codapill
* Free for both commercial and non-commercial use, with credit.
* Please do not repost this plugin anywhere.
* ----------------------------------------------------------------------
*
* "Stop right there you #$%! little #$%!!"
* Wow, what happened there? You must be using codapill_KidMode!
* Your solution to censoring words you may not wish to display
* for whatever reason that may be.
*
* How to use this plugin:
* ----------------------------------------------------------------------
*
* 1. Reserve a switch for Kid/Censor Mode in the parameters.
*    You'll need to switch it ON in the game for the plugin to work.
*
* 2. Fill in the 'Words to Censor' list. Now, when the censor switch is
*    set to ON, any words declared in that list will be censored.
*
* 3. Replace the 'Censored Replacement' field with whatever you wish
*    to have display instead of the censored words.
*
* Note: Words are not case-sensitive. Ex: 'Raspberries' would also
*       cover 'raspberries', 'rAsPbErRiEs' etc. Mmm, raspberries.
*
* Need help? Plugin busted? codapill.com
*/

(function() {

    let switchID = parseInt(PluginManager.parameters("codapill_KidMode")["Kid Mode"]);
    let censoredLanguageList = PluginManager.parameters('codapill_KidMode')['Words to Censor'];
    let censoredLanguage = JSON.parse(censoredLanguageList);
    let censoredSymbols = PluginManager.parameters('codapill_KidMode')['Censored Replacement'];
    let addFunction = Game_Message.prototype.add;

    Game_Message.prototype.add = function (text) {
        text = this.censorText(text);
        addFunction.call(this, text);
    };

    Game_Message.prototype.censorText = function(text) {

        let replaceText = text.replace(new RegExp(censoredLanguage.join('|'), 'gi'), censoredSymbols);

        if ($gameSwitches.value(switchID)) {
            return replaceText;
        } else {
            return text;
        }

    };

})();