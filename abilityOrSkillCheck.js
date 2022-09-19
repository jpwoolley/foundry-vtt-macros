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
      <input type="radio" id="Acrobatics" name="abilityType" value="acr">
      <label for="Acrobatics">Acrobatics</label>
    </div>
    <div>
      <input type="radio" id="AnimalHandling" name="abilityType" value="ani">
      <label for="AnimalHandling">Animal Handling</label>
    </div>
    <div>
      <input type="radio" id="Arcana" name="abilityType" value="arc">
      <label for="Arcana">Arcana</label>
    </div>
    <div>
      <input type="radio" id="Athletics" name="abilityType" value="ath">
      <label for="Athletics">Athletics</label>
    </div>
    <div>
      <input type="radio" id="Charisma" name="abilityType" value="cha">
      <label for="Charisma" class="ability">Charisma</label>
    </div>
    <div>
      <input type="radio" id="Constitution" name="abilityType" value="con">
      <label for="Constitution" class="ability">Constitution</label>
    </div>
    <div>
      <input type="radio" id="Deception" name="abilityType" value="dec">
      <label for="Deception">Deception</label>
    </div>
    <div>
      <input type="radio" id="Dexterity" name="abilityType" value="dex">
      <label for="Dexterity" class="ability">Dexterity</label>
    </div>
    <div>
      <input type="radio" id="History" name="abilityType" value="his">
      <label for="History">History</label>
    </div>
    <div>
      <input type="radio" id="Insight" name="abilityType" value="ins">
      <label for="Insight">Insight</label>
    </div>
    <div>
      <input type="radio" id="Intelligence" name="abilityType" value="int">
      <label for="Intelligence" class="ability">Intelligence</label>
    </div>
    <div>
      <input type="radio" id="Intimidation" name="abilityType" value="itm">
      <label for="Intimidation">Intimidation</label>
    </div>
    <div>
      <input type="radio" id="Investigation" name="abilityType" value="inv">
      <label for="Investigation">Investigation</label>
    </div>
    <div>
      <input type="radio" id="Medicine" name="abilityType" value="med">
      <label for="Medicine">Medicine</label>
    </div>
    <div>
      <input type="radio" id="Nature" name="abilityType" value="nat">
      <label for="Nature">Nature</label>
    </div>
    <div>
      <input type="radio" id="Perception" name="abilityType" value="prc">
      <label for="Perception">Perception</label>
    </div>
    <div>
      <input type="radio" id="Performance" name="abilityType" value="prf">
      <label for="Performance">Performance</label>
    </div>
    <div>
      <input type="radio" id="Persuasion" name="abilityType" value="per">
      <label for="Persuasion">Persuasion</label>
    </div>
    <div>
      <input type="radio" id="Religion" name="abilityType" value="rel">
      <label for="Religion">Religion</label>
    </div>
    <div>
      <input type="radio" id="Sleight of Hand" name="abilityType" value="slt">
      <label for="Sleight of Hand">Sleight of Hand</label>
    </div>
    <div>
      <input type="radio" id="Stealth" name="abilityType" value="ste">
      <label for="Stealth">Stealth</label>
    </div>
    <div>
      <input type="radio" id="Strength" name="abilityType" value="str">
      <label for="Strength" class="ability">Strength</label>
    </div>
    <div>
      <input type="radio" id="Survival" name="abilityType" value="sur">
      <label for="Survival">Survival</label>
    </div>
    <div>
      <input type="radio" id="Wisdom" name="abilityType" value="wis">
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

          const selectedSKill = myForm.querySelector('input[name="abilityType"]:checked').value;

          // define object for holding data
          const myObject = {
            'checkType': myForm.querySelector('input[name="checkType"]:checked').value,
            'nameShort': selectedSKill,
            'rollType': myForm.querySelector('input[name="rollType"]:checked').value,
            'situationalBonus': document.getElementById('SituationalBonus').value || 0,
            'modifier': tokenMerged[selectedSKill].mod,
            'proficiencyBonus': tokenMerged[selectedSKill].prof?._baseProficiency || tokenMerged[selectedSKill].checkProf._baseProficiency
          }

          switch (myObject.nameShort) {
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
              alias: `${canvas.tokens.controlled[0].actor.data.data.name}`
            },
            flavor: `${myObject.nameLong} ${myObject.checkType}`
          }

          // the roll!
          if (myObject.checkType === "Skill Check") {
            new Roll(`1d20 + ${myObject.modifier} + ${myObject.situationalBonus} + ${myObject.proficiencyBonus}`).toMessage(data);
            if (myObject.rollType !== 'Normal') {
              new Roll(`1d20 + ${myObject.modifier} + ${myObject.situationalBonus} + ${myObject.proficiencyBonus}`).toMessage(data);
            }
          }
          if (myObject.checkType === "Saving Throw") {
            new Roll(`1d20 + ${myObject.modifier} + ${myObject.proficiencyBonus} + ${myObject.situationalBonus}`).toMessage(data);
            if (myObject.rollType !== 'Normal') {
              new Roll(`1d20 + ${myObject.modifier} + ${myObject.proficiencyBonus} + ${myObject.situationalBonus}`).toMessage(data);
            }
          }


        }
      }
    }
  });

  diag.render(true);
}