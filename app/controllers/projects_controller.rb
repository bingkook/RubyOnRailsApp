class ProjectsController < ApplicationController
  before_action :authenticate_user!

  # GET /projects
  def index

    page=1;
    pagesize=10;

    if(params[:page]!=nil)
      page=params[:page];
    end
    if(params[:pageSize]!=nil)
      pagesize=params[:pageSize];
    end
    @record=Project.all;
    @projects =@record.paginate(:page=>page,:per_page=>pagesize)
     json_paged_response(@projects,@record.count)
  end

  # GET /projects/1
  def show
    render json: @project
  end

  # POST /projects
  def create
    @project = Project.new(project_params)
    json_response(@project, @project.save,@project.errors);
  end

  # PATCH/PUT /projects/1
  def update
    set_project
    if @project.update(project_params)
      json_response(@project)
    else
      json_response(@project, false,@project.errors);
    end
  end

  # DELETE /projects/1
  def destroy
    set_project
    @project.destroy
    json_response(@project)
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_project
    @project = Project.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def project_params
    params.require(:project).permit(:name, :description, :start_at, :end_at)
  end
end
