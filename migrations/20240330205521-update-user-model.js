"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn("Users", "id", {
      type: Sequelize.UUID,
    });

    // Change data type of 'email' column to accept only valid emails
    await queryInterface.changeColumn("Users", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    });

    // Add 'password' column for storing hashed passwords
    await queryInterface.changeColumn("Users", "password", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Hash password before creating or updating user
    const users = await queryInterface.sequelize.query(
      "SELECT id, password FROM Users;"
    );
    for (const user of users[0]) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await queryInterface.sequelize.query(
        `UPDATE Users SET password='${hashedPassword}' WHERE id='${user.id}';`
      );
    }

    await queryInterface.changeColumn("Users", "phone", {
      type: Sequelize.INTEGER,
      validate: {
        len: [8, 12],
        isNumeric: true,
        isNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn("Users", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
    await queryInterface.changeColumn("Users", "id", {
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn("Users", "phone", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.changeColumn("Users", "password", {
      type: Sequelize.STRING, 
      allowNull: false
    });
  },
};
