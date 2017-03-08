var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app',["require", "exports", "./environment", "aurelia-fetch-client", "aurelia-framework", "moment", "./models/day-registration"], function (require, exports, environment_1, aurelia_fetch_client_1, aurelia_framework_1, moment, day_registration_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App(client) {
            this.client = client;
            this.days = [];
            this.day = null;
            this.client.configure(function (config) {
                config.withBaseUrl(environment_1.default.apiUrl)
                    .useStandardConfiguration();
            });
        }
        App.prototype.attached = function () {
            this.days.push(new Day(moment()));
            this.day = this.days[0];
        };
        return App;
    }());
    App = __decorate([
        aurelia_framework_1.inject(aurelia_framework_1.NewInstance.of(aurelia_fetch_client_1.HttpClient)),
        __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient])
    ], App);
    exports.App = App;
    var Day = (function () {
        function Day(date) {
            this.date = date;
            this.entries = [];
            for (var i = 9; i <= 24; i++) {
                this.entries.push(day_registration_1.EntryTime.create(i, 0), day_registration_1.EntryTime.create(i, 15), day_registration_1.EntryTime.create(i, 30), day_registration_1.EntryTime.create(i, 45));
            }
        }
        return Day;
    }());
    exports.Day = Day;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true,
        apiUrl: 'http://localhost:5000'
    };
});

define('main',["require", "exports", "./environment"], function (require, exports, environment_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('models/day-registration',["require", "exports", "moment"], function (require, exports, moment) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DayRegistration = (function () {
        function DayRegistration() {
            this.entries = [];
            this.date = moment();
        }
        return DayRegistration;
    }());
    exports.DayRegistration = DayRegistration;
    var Entry = (function () {
        function Entry() {
        }
        return Entry;
    }());
    exports.Entry = Entry;
    var Project = (function () {
        function Project() {
            this.tasks = [];
        }
        Project.prototype.with = function (properties) {
            Object.assign(this, properties);
            return this;
        };
        Project.prototype.withTasks = function () {
            var tasks = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                tasks[_i] = arguments[_i];
            }
            this.tasks.concat(tasks);
            return this;
        };
        return Project;
    }());
    exports.Project = Project;
    var Task = (function () {
        function Task() {
        }
        Task.prototype.with = function (properties) {
            Object.assign(this, properties);
            return this;
        };
        return Task;
    }());
    exports.Task = Task;
    var Customer = (function () {
        function Customer() {
            this.projects = [];
        }
        Customer.prototype.withProjects = function () {
            var projects = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                projects[_i] = arguments[_i];
            }
            this.projects.concat(projects);
            return this;
        };
        return Customer;
    }());
    exports.Customer = Customer;
    var EntryTime = (function () {
        function EntryTime() {
        }
        EntryTime.create = function (hour, minute) {
            var result = new EntryTime();
            result.hour = hour;
            result.minute = minute;
            return result;
        };
        return EntryTime;
    }());
    exports.EntryTime = EntryTime;
});

define('models/dummy-customer-factory',["require", "exports", "./day-registration"], function (require, exports, day_registration_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DummyCustomerFactory = (function () {
        function DummyCustomerFactory() {
        }
        DummyCustomerFactory.dummyCustomers = function () {
            var result = [];
            var firstCustomer = new day_registration_1.Customer();
            firstCustomer.id = "Id1";
            firstCustomer.name = "Rancor Industries";
            firstCustomer.withProjects(new day_registration_1.Project()
                .with({ id: "Proj1", name: "Farming" })
                .withTasks(new day_registration_1.Task().with({ id: "Task1", name: "Seed" }), new day_registration_1.Task().with({ id: "Task2", name: "Water" }), new day_registration_1.Task().with({ id: "Task2", name: "Farm" })), new day_registration_1.Project()
                .with({ id: "Proj2", name: "Hunter Gather" })
                .withTasks(new day_registration_1.Task().with({ id: "Task1", name: "Hunt" }), new day_registration_1.Task().with({ id: "Task2", name: "Gather" })));
            result.push(firstCustomer);
            return firstCustomer;
        };
        return DummyCustomerFactory;
    }());
    exports.DummyCustomerFactory = DummyCustomerFactory;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <h1>Test</h1>\n \n  <table class=\"table table-striped table-hover\">\n      <thead>\n        <td>Time</td>\n        <td>${day.date}</td>\n      </thead> \n    <tr repeat.for=\"ent of day.entries\" >\n      <td>${ent.hour}:${ent.minute}</td>\n      <td css.bind=\"ent.hour < 10 ? 'background-color: red' : ''\"></td>\n    </tr>            \n    \n  </table>\n  \n</template>\n"; });
define('text!entries.html', ['module'], function(module) { module.exports = "<template>\n<!--<td>${model.hour}:${model.minute}< $/td>\n        <td>another one </td>-->\n        <td><1/td>\n        <td><2/td>\n</template>"; });
//# sourceMappingURL=app-bundle.js.map