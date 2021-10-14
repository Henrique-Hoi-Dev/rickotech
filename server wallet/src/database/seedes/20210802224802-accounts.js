module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'accounts',
      [
        {
          name: 'Account modelo 1',
          status: 'pendente',
          data_vencimento: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Account modelo 2',
          status: 'pago',
          data_vencimento: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Account modelo 3',
          status: 'cancelado',
          data_vencimento: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Account modelo 4 vencida',
          status: 'pendente',
          data_vencimento: '2021-08-01 15:36:56',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete('accounts', null, {}),
};
