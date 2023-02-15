
    def post(self):
        dados = request.get_json()
        goal = GoalsModel(dados)
        goal.initial_data = format_datetime(goal.initial_data) if 'initial_data' in dados.keys() else None
        goal.end_date = format_datetime(goal.end_date) if 'end_date' in dados.keys() else None
        goal.expected_data = format_datetime(goal.expected_data) if 'expected_data' in dados.keys() else None
        if goal.importance_degree > 5:
            return {"message": "the importance degree must be less than 5"}, 500
        if goal.current_progress < 0 or goal.current_progress > 100:
            return{"message": "the progress is not correct"}, 500
        GoalsModel.save_goal(goal)
        return {"message": "the goal has been created"}, 201