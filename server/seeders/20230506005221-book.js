'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('book', [{
      title: 'Making It So: A Memoir',
      price:  19.99,
      author_lastname: 'Stewart ',
      author_firstname: ' Patrick',
      genre: 'Biographies',
      synopsis: 'From his acclaimed stage triumphs to his legendary onscreen work in the Star Trek and X-Men franchises, Sir Patrick Stewart has captivated audiences around the world and across multiple generations with his indelible command of stage and screen.'
    },{
      title:'Greenlights',
      price: 15.99,
      author_lastname: 'McConaughey',
      author_firstname: 'Matthew',
      genre:'Biographies',
      synopsis: 'Notes about successes and failures, joys and sorrows, things that made me marvel, and things that made me laugh out loud. How to be fair. How to have less stress. How to have fun. How to hurt people less. How to get hurt less. How to be a good man. How to have meaning in life. How to be more me.'
    },{
      title: 'The Forgotten 500: The Untold Story of the Men Who Risked All for the Greatest Rescue Mission of World War II ',
      price: 17.99,
      author_lastname: 'Freeman',
      author_firstname: 'Gregory A.',
      genre: 'History',
      synopsis: 'During a bombing campaign over Romanian oil fields, hundreds of American airmen were shot down in Nazi-occupied Yugoslavia. Local Serbian farmers and peasants risked their own lives to give refuge to the soldiers while they waited for rescue, and in 1944, Operation Halyard was born.'
    },{
      title: 'The Wager: A Tale of Shipwreck, Mutiny and Murder',
      price: 19.99,
      author_lastname: 'Grann',
      author_firstname: 'David',
      genre: 'History',
      synopsis: 'On January 28, 1742, a ramshackle vessel of patched-together wood and cloth washed up on the coast of Brazil. Inside were thirty emaciated men, barely alive, and they had an extraordinary tale to tell.'
    },{
      title: 'Dual Memory',
      price: 15.99,
      author_lastname: 'Burke',
      author_firstname: 'Sue',
      genre: 'Science Fiction',
      synopsis: 'Antonio Moro lost everything to the Leviathan League. Now he is alone in a city on an Arctic island fighting the ruthless, global pirates with the chance to be the artist he always wanted to be.'
    },{
      title: 'The Final Strife: Book One of The Ending Fire Trilogy',
      price: 17.99,
      author_lastname: 'El-Arifi',
      author_firstname: 'Saara',
      genre: 'Science Fiction',
      synopsis: 'Sylah dreams of days growing up in the resistance, being told she would spark a revolution that would free the empire from the red-blooded ruling classes tyranny. That spark was extinguished the day she watched her family murdered before her eyes.'
    },{
      title: 'It Starts with Us: A Novel',
      price: 15.99,
      author_lastname: 'Hoover',
      author_firstname: 'Colleen',
      genre: 'Romance',
      synopsis: 'Lily and her ex-husband, Ryle, have just settled into a civil coparenting rhythm when she suddenly bumps into her first love, Atlas, again. After nearly two years separated, she is elated that for once, time is on their side, and she immediately says yes when Atlas asks her on a date.'
    },{
      title: 'The Seven Husbands of Evelyn Hugo: A Novel',
      price: 19.99,
      author_lastname: 'Reid',
      author_firstname: 'Taylor Jenkins',
      genre: 'Romance',
      synopsis: 'Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life. But when she chooses unknown magazine reporter Monique Grant for the job, no one is more astounded than Monique herself. Why her? Why now?'
    },{
      title: 'Magnolia Table',
      price: 19.99,
      author_lastname: 'Gaines',
      author_firstname: 'Joanna',
      genre: 'Culinary',
      synopsis: 'Jo believes there is no better way to celebrate family and friendship than through the art of togetherness, celebrating tradition, and sharing a great meal. Magnolia Table includes 125 classic recipes.'
    },{
      title: 'Mi Cocina: Recipes and Rapture from My Kitchen in Mexico: A Cookbook',
      price: 17.99,
      author_lastname: 'Martínez',
      author_firstname: 'Rick',
      genre: 'Culinary',
      synopsis: 'Join Rick Martínez on a once-in-a-lifetime culinary journey throughout México that begins in Mexico City and continues through 32 states, in 156 cities, and across 20,000 incredibly delicious miles.'
    }
  
    ])
  },

  async down (queryInterface, Sequelize) {
  }
};