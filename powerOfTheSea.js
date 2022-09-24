const SAVINGTHROW = 8 + _token.actor._classes.barbarian.system.prof._baseProficiency + _token.actor.system.abilities.con.mod;
const BARBLEVEL = _token.actor._classes.barbarian.system.levels
let damage;
if (BARBLEVEL < 10){damage = "1d6"};
if (BARBLEVEL >= 10 && BARBLEVEL < 15){damage = "2d6"};
if (BARBLEVEL >= 15 && BARBLEVEL < 20){damage = "3d6"};
if (BARBLEVEL >= 20){damage = "4d6"};

const content = `
<div>
<h2>Power of the SEEAAA! 🌊</h2>
<p>${_token.actor.name} summons the power of the SEEAAA! He emanate a stormy, magical aura for 10 feet in every direction (but not through total cover).</p>
<p>${_token.actor.name} chooses one other creature to target. The target must make a <strong style="color:darkred">Dexterity saving throw of at least ${SAVINGTHROW}</strong>. The target takes <strong style="color:blue">${damage} lightning damage </strong>on a failed save, or half as much damage on a successful one.</p>
<br>
<p>Click to roll: [[/roll 1d20 + @dex]]</p>
</div>
`

ChatMessage.create({
  speaker: {
    alias: _token.actor.name
  },
  content: content
})

new Roll(damage).toMessage({
  flavor: 'The contents of this can of lightning whoop-ass ⚡',
  speaker: {
    alias: _token.actor.name
  }
})