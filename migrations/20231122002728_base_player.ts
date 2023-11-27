import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('player_stats', function (table) {
    table.increments('id_player_stats');
    table.text('name_player');
    table.text('image_player');
    table.integer('passing_yards_player_stats');
    table.decimal('yards_per_attempt_player_stats');
    table.integer('attempts_player_stats');
    table.integer('completions_player_stats');
    table.decimal('completion_percentage_player_stats');
    table.integer('touchdowns_player_stats');
    table.integer('interceptions_player_stats');
    table.decimal('quarterback_rating_player_stats');
    table.integer('first_downs_player_stats');
    table.decimal('first_down_percentage_player_stats');
    table.integer('twenty_plus_yard_completions_player_stats');
    table.integer('forty_plus_yard_completions_player_stats');
    table.integer('longest_pass_player_stats');
    table.integer('sacks_player_stats');
    table.integer('sack_yards_player_stats');
    table.integer('data_player_stats');
    table.timestamp('data_cadastro').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('player_stats');
}
