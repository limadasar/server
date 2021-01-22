'use strict';
const fs = require('fs')


module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let arrData = fs.readFileSync('./listHewan.txt',{encoding:'utf-8'}).split('\n')
    let data = []

    arrData.forEach(nama=>{
        data.push({
            answer: nama,
            category: 'Hewan',
            firstAlphabet: nama[0],
            createdAt: new Date(),
            updatedAt: new Date()
        })
    })

    await queryInterface.bulkInsert('Answers', data, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Answers', null, {})
  }
};
