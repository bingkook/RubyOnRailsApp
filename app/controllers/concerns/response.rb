module Response
  def json_response(object, status = true,error="")
    render json: {data:object, ok: status,error:error}
  end

  def json_paged_response(object,total, status = true,error="")
    render json: {
      data:
      {
        list:object,total:total
      },
       ok: status,
       error:error
     }
  end
end
