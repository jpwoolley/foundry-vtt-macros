main()

async function main() {

  // Choose roll type dialog
  let diagHTML = `
<div id="myForm">
  <fieldset>
    <legend>Roll Type</legend>
    <div>
      <input type="radio" id="Saving" name="rollType" value="Saving Throw" checked>
      <label for="Saving">Saving throw</label>
    </div>
    <div>
      <input type="radio" id="Skill" name="rollType" value="Ability Check">
      <label for="Skill">Skill check</label>
    </div>
  </fieldset>
  <fieldset>
    <legend>Attribute</legend>
    <div>
      <input type="radio" id="Acrobatics" name="abilityType" value="acr" class="skill">
      <label for="Acrobatics">Acrobatics</label>
    </div>
    <div>
      <input type="radio" id="AnimalHandling" name="abilityType" value="ani" class="skill">
      <label for="AnimalHandling">Animal Handling</label>
    </div>
    <div>
      <input type="radio" id="Arcana" name="abilityType" value="arc" class="skill">
      <label for="Arcana">Arcana</label>
    </div>
    <div>
      <input type="radio" id="Athletics" name="abilityType" value="ath" class="skill">
      <label for="Athletics">Athletics</label>
    </div>
    <div>
      <input type="radio" id="Charisma" name="abilityType" value="cha" class="ability">
      <label for="Charisma">Charisma</label>
    </div>
    <div>
      <input type="radio" id="Constitution" name="abilityType" value="con">
      <label for="Constitution">Constitution</label>
    </div>
    <div>
      <input type="radio" id="Deception" name="abilityType" value="dec" class="skill">
      <label for="Deception">Deception</label>
    </div>
    <div>
      <input type="radio" id="Dexterity" name="abilityType" value="dex" class="ability">
      <label for="Dexterity">Dexterity</label>
    </div>
    <div>
      <input type="radio" id="History" name="abilityType" value="his" class="skill">
      <label for="History">History</label>
    </div>
    <div>
      <input type="radio" id="Insight" name="abilityType" value="ins" class="skill">
      <label for="Insight">Insight</label>
    </div>
    <div>
      <input type="radio" id="Intelligence" name="abilityType" value="int" class="ability">
      <label for="Intelligence">Intelligence</label>
    </div>
    <div>
      <input type="radio" id="Intimidation" name="abilityType" value="itm" class="skill">
      <label for="Intimidation">Intimidation</label>
    </div>
    <div>
      <input type="radio" id="Investigation" name="abilityType" value="inv" class="skill">
      <label for="Investigation">Investigation</label>
    </div>
    <div>
      <input type="radio" id="Medicine" name="abilityType" value="med" class="skill">
      <label for="Medicine">Medicine</label>
    </div>
    <div>
      <input type="radio" id="Nature" name="abilityType" value="nat" class="skill">
      <label for="Nature">Nature</label>
    </div>
    <div>
      <input type="radio" id="Perception" name="abilityType" value="prc" class="skill">
      <label for="Perception">Perception</label>
    </div>
    <div>
      <input type="radio" id="Performance" name="abilityType" value="prf" class="skill">
      <label for="Performance">Performance</label>
    </div>
    <div>
      <input type="radio" id="Persuasion" name="abilityType" value="per" class="skill">
      <label for="Persuasion">Persuasion</label>
    </div>
    <div>
      <input type="radio" id="Religion" name="abilityType" value="rel" class="skill">
      <label for="Religion">Religion</label>
    </div>
    <div>
      <input type="radio" id="Sleight of Hand" name="abilityType" value="slt" class="skill">
      <label for="Sleight of Hand">Sleight of Hand</label>
    </div>
    <div>
      <input type="radio" id="Stealth" name="abilityType" value="ste" class="skill">
      <label for="Stealth">Stealth</label>
    </div>
    <div>
      <input type="radio" id="Strength" name="abilityType" value="str" class="ability">
      <label for="Strength">Strength</label>
    </div>
    <div>
      <input type="radio" id="Survival" name="abilityType" value="sur" class="skill">
      <label for="Survival">Survival</label>
    </div>
    <div>
      <input type="radio" id="Wisdom" name="abilityType" value="wis" class="ability">
      <label for="SWisdom">Wisdom</label>
    </div>
  </fieldset>
  <fieldset>
    <legend>Level</legend>
    <div>
      <input type="radio" id="Disadvantage" name="levelType" value="Disadvantage">
      <label for="Disadvantage">Disadvantage</label>
    </div>
    <div>
      <input type="radio" id="Normal" name="levelType" value="Normal" checked>
      <label for="Normal">Normal</label>
    </div>
    <div>
      <input type="radio" id="Advantage" name="levelType" value="Advantage">
      <label for="Advantage">Advantage</label>
    </div>
  </fieldset>
  <fieldset>
    <legend>Situational Bonus</legend>
    <div>
      <input type="text" id="SituationalBonus" name="SituationalBonus">
    </div>
  </fieldset>
</div>`;

  // get abilities and skills
  const tokenAbilities = canvas.tokens.controlled[0].actor.data.data.abilities;
  const tokenSkills = canvas.tokens.controlled[0].actor.data.data.skills
  const tokenMerged = { ...tokenAbilities, ...tokenSkills }

  // create dialogue
  let diag = new Dialog({
    title: "Roll",
    content: diagHTML,
    buttons: {
      ok: {
        label: "Roll",
        callback: async (html) => {
          const myForm = document.getElementById("myForm")

          // define object for holding data
          const myObject = {
            'checkType': myForm.querySelector('input[name="rollType"]:checked').value,
            'nameShort': myForm.querySelector('input[name="abilityType"]:checked').value,
            'rollType': myForm.querySelector('input[name="levelType"]:checked').value,
            'situationalBonus': document.getElementById('SituationalBonus').value || 0,
            'modifier': tokenMerged[selectedAbilityType].mod,
            'proficiencyBonus': tokenMerged[selectedAbilityType].prof._baseProficiency || tokenMerged[selectedAbilityType].checkProf._baseProficiency
          }

          switch (selectedAbilityType) {
            case 'acr':
              myObject.nameLong = 'Acrobatics';
              break;
            case 'ani':
              myObject.nameLong = 'Animal Handling';
              break;
            case 'arc':
              myObject.nameLong = 'Arcana';
              break;
            case 'ath':
              myObject.nameLong = 'Athletics';
              break;
            case 'cha':
              myObject.nameLong = 'Charisma';
              break;
            case 'con':
              myObject.nameLong = 'Constitution';
              break;
            case 'dec':
              myObject.nameLong = 'Deception';
              break;
            case 'dex':
              myObject.nameLong = 'Dexterity';
              break;
            case 'his':
              myObject.nameLong = 'History';
              break;
            case 'ins':
              myObject.nameLong = 'Insight';
              break;
            case 'int':
              myObject.nameLong = 'Intelligence';
              break;
            case 'itm':
              myObject.nameLong = 'Intimidation';
              break;
            case 'inv':
              myObject.nameLong = 'Investigation';
              break;
            case 'med':
              myObject.nameLong = 'Medicine';
              break;
            case 'nat':
              myObject.nameLong = 'Nature';
              break;
            case 'prc':
              myObject.nameLong = 'Perception';
              break;
            case 'prf':
              myObject.nameLong = 'Performance';
              break;
            case 'per':
              myObject.nameLong = 'Perception';
              break;
            case 'rel':
              myObject.nameLong = 'Religion';
              break;
            case 'slt':
              myObject.nameLong = 'Sleight of Hand';
              break;
            case 'ste':
              myObject.nameLong = 'Stealth';
              break;
            case 'str':
              myObject.nameLong = 'Stength';
              break;
            case 'sur':
              myObject.nameLong = 'Survival';
              break;
            case 'wis':
              myObject.nameLong = 'Wisdom';
              break;

          }

          // chat data
          const data = {
            user: game.user._id,
            speaker: {
              alias: `${canvas.tokens.controlled[0].actor.data.data.name} 💪`
            },
            flavor: `${myObject.nameLong} ${myObject.rollType}`
          }

          // the roll!
          if (selectedRollType === "Skill") {
            new Roll(`1d20 + ${myObject.modifier} + ${myObject.situationalBonus} + ${myObject.proficiencyBonus}`).toMessage(data);
            if (selectedLevelType !== 'Normal') {
              new Roll(`1d20 + ${myObject.modifier} + ${myObject.situationalBonus} + ${myObject.proficiencyBonus}`).toMessage(data);
            }
          }
          if (selectedRollType === "Saving") {
            new Roll(`1d20 + ${myObject.modifier} + ${myObject.proficiencyBonus} + ${myObject.situationalBonus}`).toMessage(data);
            if (selectedLevelType !== 'Normal') {
              new Roll(`1d20 + ${myObject.modifier} + ${myObject.proficiencyBonus} + ${myObject.situationalBonus}`).toMessage(data);
            }
          }


        }
      }
    }
  });

  diag.render(true);
}