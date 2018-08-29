class CreateTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :tasks do |t|
      t.string :name
      t.string :description
      t.integer :project_id
      t.integer :user_id
      t.integer :status

      t.timestamps
    end
  end
end
