class CreateProjects < ActiveRecord::Migration[5.0]
  def change
    create_table :projects do |t|
      t.string :name
      t.string :description
      t.datetime :start_at
      t.datetime :end_at
      t.datetime :created_at

      t.timestamps
    end
  end
end
