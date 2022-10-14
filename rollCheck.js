main()

async function main() {

  // Choose roll type dialog
  let diagHTML = `
  <style>
    .ability {
      color: blue;
    }
  </style>
<div id="myForm">
  <fieldset>
    <legend>Roll Type</legend>
    <div>
      <input type="radio" id="Saving" name="checkType" value="Saving Throw" checked>
      <label for="Saving">Saving throw</label>
    </div>
    <div>
      <input type="radio" id="Skill" name="checkType" value="Skill Check">
      <label for="Skill">Skill check</label>
    </div>
  </fieldset>
  <fieldset>
    <legend>Abilities and skills</legend>
    <div>
      <input type="radio" id="Acrobatics" name="ability" value="acr">
      <label for="Acrobatics">Acrobatics</label>
    </div>
    <div>
      <input type="radio" id="AnimalHandling" name="ability" value="ani">
      <label for="AnimalHandling">Animal Handling</label>
    </div>
    <div>
      <input type="radio" id="Arcana" name="ability" value="arc">
      <label for="Arcana">Arcana</label>
    </div>
    <div>
      <input type="radio" id="Athletics" name="ability" value="ath">
      <label for="Athletics">Athletics</label>
    </div>
    <div>
      <input type="radio" id="Charisma" name="ability" value="cha">
      <label for="Charisma" class="ability">Charisma</label>
    </div>
    <div>
      <input type="radio" id="Constitution" name="ability" value="con">
      <label for="Constitution" class="ability">Constitution</label>
    </div>
    <div>
      <input type="radio" id="Deception" name="ability" value="dec">
      <label for="Deception">Deception</label>
    </div>
    <div>
      <input type="radio" id="Dexterity" name="ability" value="dex">
      <label for="Dexterity" class="ability">Dexterity</label>
    </div>
    <div>
      <input type="radio" id="History" name="ability" value="his">
      <label for="History">History</label>
    </div>
    <div>
      <input type="radio" id="Insight" name="ability" value="ins">
      <label for="Insight">Insight</label>
    </div>
    <div>
      <input type="radio" id="Intelligence" name="ability" value="int">
      <label for="Intelligence" class="ability">Intelligence</label>
    </div>
    <div>
      <input type="radio" id="Intimidation" name="ability" value="itm">
      <label for="Intimidation">Intimidation</label>
    </div>
    <div>
      <input type="radio" id="Investigation" name="ability" value="inv">
      <label for="Investigation">Investigation</label>
    </div>
    <div>
      <input type="radio" id="Medicine" name="ability" value="med">
      <label for="Medicine">Medicine</label>
    </div>
    <div>
      <input type="radio" id="Nature" name="ability" value="nat">
      <label for="Nature">Nature</label>
    </div>
    <div>
      <input type="radio" id="Perception" name="ability" value="prc">
      <label for="Perception">Perception</label>
    </div>
    <div>
      <input type="radio" id="Performance" name="ability" value="prf">
      <label for="Performance">Performance</label>
    </div>
    <div>
      <input type="radio" id="Persuasion" name="ability" value="per">
      <label for="Persuasion">Persuasion</label>
    </div>
    <div>
      <input type="radio" id="Religion" name="ability" value="rel">
      <label for="Religion">Religion</label>
    </div>
    <div>
      <input type="radio" id="Sleight of Hand" name="ability" value="slt">
      <label for="Sleight of Hand">Sleight of Hand</label>
    </div>
    <div>
      <input type="radio" id="Stealth" name="ability" value="ste">
      <label for="Stealth">Stealth</label>
    </div>
    <div>
      <input type="radio" id="Strength" name="ability" value="str">
      <label for="Strength" class="ability">Strength</label>
    </div>
    <div>
      <input type="radio" id="Survival" name="ability" value="sur">
      <label for="Survival">Survival</label>
    </div>
    <div>
      <input type="radio" id="Wisdom" name="ability" value="wis">
      <label for="SWisdom" class="ability">Wisdom</label>
    </div>
  </fieldset>
  <fieldset>
    <legend>Level</legend>
    <div>
      <input type="radio" id="Disadvantage" name="rollType" value="Disadvantage">
      <label for="Disadvantage">Disadvantage</label>
    </div>
    <div>
      <input type="radio" id="Normal" name="rollType" value="Normal" checked>
      <label for="Normal">Normal</label>
    </div>
    <div>
      <input type="radio" id="Advantage" name="rollType" value="Advantage">
      <label for="Advantage">Advantage</label>
    </div>
  </fieldset>
  <fieldset>
    <legend>Situational Bonus</legend>
    <div>
      <input type="text" id="SituationalBonus" name="SituationalBonus" placeholder="e.g. 10, -10">
    </div>
  </fieldset>
</div>`;

  // get abilities and skills
  

  // create dialogue
  let diag = new Dialog({
    title: `Roll Check | ${_token.actor.name}`,
    content: diagHTML,
    buttons: {
      ok: {
        label: "Roll",
        callback: async () => {
          const myform = document.getElementById('myForm')
          const tokenMerged = {..._token.actor.system.abilities, ..._token.actor.system.skills};
          const selectedAbility = myform.querySelector('input[name="ability"]:checked').value;
          const selectedCheckType = myform.querySelector('input[name="checkType"]:checked').value;
          const selectedRollType = myform.querySelector('input[name="rollType"]:checked').value;
          const selectedSituationalBonus = document.getElementById('SituationalBonus').value || 0;
          const modifer = tokenMerged[selectedAbility].mod;
          const proficiencyBonus = tokenMerged[selectedAbility].prof?._baseProficiency || tokenMerged[selectedAbility].checkProf._baseProficiency;

          let abilityOrSkillFullName;
          switch (selectedAbility) {
            case 'acr':
              abilityOrSkillFullName = 'Acrobatics';
              break;
            case 'ani':
              abilityOrSkillFullName = 'Animal Handling';
              break;
            case 'arc':
              abilityOrSkillFullName = 'Arcana';
              break;
            case 'ath':
              abilityOrSkillFullName = 'Athletics';
              break;
            case 'cha':
              abilityOrSkillFullName = 'Charisma';
              break;
            case 'con':
              abilityOrSkillFullName = 'Constitution';
              break;
            case 'dec':
              abilityOrSkillFullName = 'Deception';
              break;
            case 'dex':
              abilityOrSkillFullName = 'Dexterity';
              break;
            case 'his':
              abilityOrSkillFullName = 'History';
              break;
            case 'ins':
              abilityOrSkillFullName = 'Insight';
              break;
            case 'int':
              abilityOrSkillFullName = 'Intelligence';
              break;
            case 'itm':
              abilityOrSkillFullName = 'Intimidation';
              break;
            case 'inv':
              abilityOrSkillFullName = 'Investigation';
              break;
            case 'med':
              abilityOrSkillFullName = 'Medicine';
              break;
            case 'nat':
              abilityOrSkillFullName = 'Nature';
              break;
            case 'prc':
              abilityOrSkillFullName = 'Perception';
              break;
            case 'prf':
              abilityOrSkillFullName = 'Performance';
              break;
            case 'per':
              abilityOrSkillFullName = 'Perception';
              break;
            case 'rel':
              abilityOrSkillFullName = 'Religion';
              break;
            case 'slt':
              abilityOrSkillFullName = 'Sleight of Hand';
              break;
            case 'ste':
              abilityOrSkillFullName = 'Stealth';
              break;
            case 'str':
              abilityOrSkillFullName = 'Stength';
              break;
            case 'sur':
              abilityOrSkillFullName = 'Survival';
              break;
            case 'wis':
              abilityOrSkillFullName = 'Wisdom';
              break;

          }

          let rollTypeFormula;
          // Roll type
          switch(selectedRollType){
            case 'Normal':
              rollTypeFormula = '1d20'
              break;
            case 'Advantage':
              rollTypeFormula = '2d20kh'
              break;
            case 'Disadvantage':
              rollTypeFormula = '2d20kl'
              break;
          }

          // chat data
          const data = {
            speaker: {
              alias: _token.actor.name
            },
            flavor: `${abilityOrSkillFullName} ${selectedCheckType} (${selectedRollType})`
          }

          // check for any effects
          // if a barbarian and raging and it's a stength skill check
          if((_token.actor.classes.hasOwnProperty('barbarian')) && (_token.actor.effects.contents.find(x => x.label == 'Rage').disabled === false) && (selectedAbility === 'str')){
            rollTypeFormula = '2d20kh';
            data.flavor = `${abilityOrSkillFullName} ${selectedCheckType} (Advantage because Rage effect is active)`
          }

          // the roll!
          if (selectedCheckType === "Skill Check") {
            new Roll(`${rollTypeFormula} + ${modifer} + ${selectedSituationalBonus} + ${proficiencyBonus}`).toMessage(data);
          }
          if (selectedCheckType === "Saving Throw") {
            new Roll(`${rollTypeFormula} + ${modifer} + ${proficiencyBonus} + ${selectedSituationalBonus}`).toMessage(data);
          }


        }
      }
    }
  });

  diag.render(true);
}