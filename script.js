var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var checkStatus = function checkStatus(repsonse) {
  if (repsonse.ok) {
    return repsonse;
  }
  throw new Error('Request was either a 404 or 500');
};

var json = function json(repsonse) {
  return repsonse.json();
};

var Task = function (_React$Component) {
  _inherits(Task, _React$Component);

  function Task() {
    _classCallCheck(this, Task);

    return _possibleConstructorReturn(this, (Task.__proto__ || Object.getPrototypeOf(Task)).apply(this, arguments));
  }

  _createClass(Task, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          task = _props.task,
          onDelete = _props.onDelete,
          onComplete = _props.onComplete;
      var id = task.id,
          content = task.content,
          completed = task.completed;


      return React.createElement(
        "div",
        { className: "row mb-1" },
        React.createElement(
          "p",
          { className: "col" },
          content
        ),
        React.createElement(
          "button",
          {
            onClick: function onClick() {
              return onDelete(id);
            }
          },
          "Delete"
        ),
        React.createElement("input", {
          className: "d-inline-block mt-2",
          type: "checkbox",
          onChange: function onChange() {
            return onComplete(id, completed);
          },
          checked: completed
        })
      );
    }
  }]);

  return Task;
}(React.Component);

var ToDoList = function (_React$Component2) {
  _inherits(ToDoList, _React$Component2);

  function ToDoList(props) {
    _classCallCheck(this, ToDoList);

    var _this2 = _possibleConstructorReturn(this, (ToDoList.__proto__ || Object.getPrototypeOf(ToDoList)).call(this, props));

    _this2.state = {
      new_task: '',
      tasks: [],
      filter: 'all'
    };

    _this2.handleChange = _this2.handleChange.bind(_this2);
    _this2.handleSubmit = _this2.handleSubmit.bind(_this2);
    _this2.fetchTasks = _this2.fetchTasks.bind(_this2);
    _this2.deleteTask = _this2.deleteTask.bind(_this2);
    _this2.toggleComplete = _this2.toggleComplete.bind(_this2);
    _this2.toggleFilter = _this2.toggleFilter.bind(_this2);

    return _this2;
  }

  _createClass(ToDoList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchTasks();
    }
  }, {
    key: "fetchTasks",
    value: function fetchTasks() {
      var _this3 = this;

      fetch("https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=512").then(checkStatus).then(json).then(function (response) {
        console.log(response);
        _this3.setState({ tasks: response.tasks });
      }).catch(function (error) {
        console.error(error.message);
      });
    }
  }, {
    key: "handleChange",
    value: function handleChange(event) {
      this.setState({ new_task: event.target.value });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      var _this4 = this;

      event.preventDefault();
      var new_task = this.state.new_task;

      new_task = new_task.trim();
      if (!new_task) {
        return;
      }

      fetch("https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=512", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: {
            content: new_task
          }
        })
      }).then(checkStatus).then(json).then(function (data) {
        _this4.setState({ new_taks: '' });
        _this4.fetchTasks();
      }).catch(function (error) {
        _this4.setState({ error: error.message });
        console.log(error);
      });
      //let { task } = this.state;
      //task = task.content
    }
  }, {
    key: "deleteTask",
    value: function deleteTask(id) {
      var _this5 = this;

      if (!id) {
        return;
      }

      fetch("https://altcademy-to-do-list-api.herokuapp.com/tasks/" + id + "?api_key=512", {
        method: "DELETE",
        mode: "cors"
      }).then(checkStatus).then(json).then(function (data) {
        _this5.fetchTasks();
      });
    }
  }, {
    key: "toggleComplete",
    value: function toggleComplete(id, completed) {
      var _this6 = this;

      if (!id) {
        return;
      }

      var newState = completed ? 'active' : 'complete';

      fetch("https://altcademy-to-do-list-api.herokuapp.com/tasks/" + id + "/mark_" + newState + "?api_key=512", {
        method: "PUT",
        mode: "cors"
      }).then(checkStatus).then(json).then(function (data) {
        _this6.fetchTasks();
      }).catch(function (error) {
        _this6.setState({ error: error.message });
        console.log(error);
      });
    }
  }, {
    key: "toggleFilter",
    value: function toggleFilter(e) {
      console.log(e.target.name);
      this.setState({
        filter: e.target.name
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var _state = this.state,
          new_task = _state.new_task,
          tasks = _state.tasks,
          filter = _state.filter;


      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "h1",
          { className: "text-center mt-5 mb-3" },
          "To-Do List"
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-12" },
            React.createElement(
              "form",
              { onSubmit: this.handleSubmit, className: "form-inline my-4" },
              "To-Do Item: ",
              React.createElement("input", {
                type: "text",
                className: "form-control mr-sm-2",
                placeholder: "Fold Laundry",
                value: new_task,
                onChange: this.handleChange
              }),
              React.createElement(
                "button",
                { type: "submit", className: "btn btn-primary mb-2" },
                "Submit"
              )
            ),
            tasks.length > 0 ? tasks.filter(function (task) {
              if (filter === 'all') {
                return true;
              } else if (filter === 'active') {
                return !task.completed;
              } else {
                return task.completed;
              }
            }).map(function (task) {
              return React.createElement(Task, {
                key: task.id,
                task: task,
                onDelete: _this7.deleteTask,
                onComplete: _this7.toggleComplete
              });
            }) : React.createElement(
              "p",
              null,
              "no tasks here"
            ),
            React.createElement(
              "div",
              { className: "mt-3" },
              React.createElement(
                "label",
                null,
                React.createElement("input", { type: "checkbox", name: "all", checked: filter === "all", onChange: this.toggleFilter }),
                " All"
              ),
              React.createElement(
                "label",
                null,
                React.createElement("input", { type: "checkbox", name: "active", checked: filter === "active", onChange: this.toggleFilter }),
                " Active"
              ),
              React.createElement(
                "label",
                null,
                React.createElement("input", { type: "checkbox", name: "completed", checked: filter === "completed", onChange: this.toggleFilter }),
                " Completed"
              )
            )
          )
        )
      );
    }
  }]);

  return ToDoList;
}(React.Component);

ReactDOM.render(React.createElement(ToDoList, null), document.getElementById('root'));