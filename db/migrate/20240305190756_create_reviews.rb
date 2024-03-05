class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.integer :rating, null: false
      t.text :body, null: false
      t.references :user, foreign_key: true, null: false
      t.references :bench, foreign_key: true, null: false

      t.timestamps
    end

    add_index :reviews, [:user_id, :bench_id], unique: true
  end
end
