/*
What this macro does

This macro will toggle an effect, decrement an associated resource counter, output a chat message and run additional code as required.

Note that for this macro to work, you will need to have a resource counter labelled with the same name as the effect.

There are 3 scenarios for this macro:
1. The effect is not currently activated and the token has enough resources remaining to activate it.
2. The effect is not currently activated but the token does not have enough resources remaining to activate it.
3. The effect is already affect and therefore needs to be deactivated.

The macro will determine which scenerio it is in automatically when you run it.

Each scenario has it's own associated chat message content and additional code which can be run. For scenario 1, these are stored as 'content1' and 'code1' respectively, and so on.
If you don't want a chat message to be generated, leave the assocaited variables blank and set chatMessageToggle to false.
If you don't want additional code to be run, leave the script block of the function empty.

*/

const effectName = 'Rage'; // CHANGE ME TO THE NAME OF THE EFFECT
const chatMessageToggle = true // CHANGE ME TO SET WHETHER YOU WANT A CHAT MESSAGE TO BE GENERATED
const tokenName = _token.actor.name
let chatMessageContent;
const resources = _token.actor.system.resources
let resourcePath;
let resourceObject;

if (resources.primary.label = effectName) {
  resourcePath = 'system.resources.primary.value'
  resourceObject = _token.actor.system.resources.primary
}
else if (resources.secondary.label = effectName) {
  resourcePath = 'system.resources.secondary.value'
  resourceObject = _token.actor.system.resources.secondary
}
else if (resources.tertiary.label = effectName) {
  resourcePath = 'system.resources.tertiary.value'
  resourceObject = _token.actor.system.resources.tertiary
}
else {
  ui.notifications.error(`No resources matching the name ${effectName}`)
  throw 'No matching resources'
}

// CHANGE content1 AND code1 FOR SCENARIO 1
const content1 = `
<h2>Engage The Rage! 😠</h2>
${tokenName} engages the <span style="color:red">RAGE</span>!
`
const code1 = await function(){
  canvas.tokens.controlled[0].document.update({
    light: {
      'dim': 12.5
    },
  });
}
// CHANGE content2 AND code2 FOR SCENARIO 2
const content2 = `
<h2>Engage The...oh 😳</h2>
${tokenName} attempts to engage the rage...but they have nothing left to give.

They have 0 uses left.
`
const code2 = await function(){
  
}
// CHANGE content3 AND code3 FOR SCENARIO 3
const content3 = `
<h2>The Rage Subsides...😌</h2>
${tokenName} takes a deep breath and calms down. The rage subsides...
  
They have ${resourceObject.value} left.
`
const code3 = await function(){
  canvas.tokens.controlled[0].document.update({
    light: {
      'dim': 0
    },
  });
}


// if effect is not currently active
if (_token.actor.effects.contents.find(x => x.label == effectName).disabled === true) {

  // SCENARIO 2
  if (resourceObject.value <= 0) {
    ui.notifications.error(`Not enough resouces remaining to activate ${effectName}`)
    chatMessageContent = content2

    // additional code to be run
    code2()
  }

  // SCENARIO 1
  else if (resourceObject.value > 0) {
    // activate the effect
    dnd5e.documents.macro.toggleEffect(effectName);

    // decrement the resource counter
    await _token.actor.update({
      [resourcePath]: resourceObject.value - 1
    })

    // set chat message content
    chatMessageContent = content1

    // additional code to be run
    code1()

  }

} 
// SCENARIO 3
else {
  // toggle the effect
  dnd5e.documents.macro.toggleEffect(effectName);

  // set chat message content
  chatMessageContent = content3
  
  // additional code to be run
  code3()

}

// GENERATE THE CHAT MESSAGE
if(chatMessageToggle){
  ChatMessage.create({
    speaker: {
      alias: tokenName
    },
    content: chatMessageContent
  })
}