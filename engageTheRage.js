// macro currently only activates rage. It code for deactivating it is written but unsure what value to check to see if already active currently.

const effectName = 'Rage';
let content;

// if effect is not currently active
if(true){

  // If enough resources remaining
  if (_token.actor.system.resources.primary.value > 0) {
    // activate the effect
    dnd5e.documents.macro.toggleEffect(effectName);
  
    // decrement the resource counter
    await _token.actor.update({
      'system.resources.primary.value': _token.actor.system.resources.primary.value - 1
    })
  
    // activate light effect
    await token.document.update({
      light: {
        'dim': 12.5
      },
    });
  
    // set content for chat
    content = `
    ${_token.actor.name} engages the rage!
    
    They have ${_token.actor.system.resources.primary.value} uses left`
  }
  
  // If not enough resources remaining
  if (_token.actor.system.resources.primary.value <= 0) {
  
    // deactivate light effect
    await token.document.update({
      light: {
        'dim': 0
      },
    });
  
    // set content for chat
    content = `
    ${_token.actor.name} attempts to engage the rage...but they have nothing left to give.
    
    They have ${_token.actor.system.resources.primary.value} uses left
    `
  }
  
}

// if effect is already active
if(false){
  dnd5e.documents.macro.toggleEffect(effectName);

  await token.document.update({
    light: {
      'dim': 0
    },
  });

  content = `
  ${_token.actor.name} takes a deep breath and calms down. The rage subsides...
  
  They have ${_token.actor.system.resources.primary.value} uses left
  `
}

ChatMessage.create({
  speaker: {
    alias: _token.actor.name
  },
  content: content
})