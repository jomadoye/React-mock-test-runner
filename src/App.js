import React, { Component } from "react";
import { Row, Col, Typography, Table, Button } from "antd";
import "./App.css";
const { Title, Text } = Typography;

const makeDummyTest = () => {
  const delay = 7000 + Math.random() * 7000;
  const testPassed = Math.random() > 0.5;

  return callback => {
    window.setTimeout(() => callback(testPassed), delay);
  };
};

const initialTests = [
  { description: "uploads go in both directions", run: makeDummyTest() },
  { description: "PDFs are adequately waterproof", run: makeDummyTest() },
  {
    description: "videos are heated to 12,000,000 Kelvin",
    run: makeDummyTest()
  },
  { description: "subpixels can go rock climbing", run: makeDummyTest() },
  {
    description: "images are squarer than traffic cones",
    run: makeDummyTest()
  },
  {
    description: "metaproperties don't go too meta",
    run: makeDummyTest()
  }
]
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tests: initialTests,
      hasTestRan: false,
      passedTests: [],
      queuedTests: []
    };
  }

  updateTestStatus = (status, test, resolve) => {
    const { passedTests, queuedTests } = this.state;
    const newtests = this.state.tests.map(item =>
      item.description === test.description
        ? { ...item, status: status ? "PASSED" : "FAILED" }
        : item
    );

    this.setState({
      tests: [...newtests],
      passedTests: status
        ? [...passedTests, test.description]
        : [...passedTests],
      queuedTests: [...queuedTests.filter(item => item !== test.description)]
    });
    resolve(test);
  };

  resetTestState = () => {
    this.setState({ passedTests: [], queuedTests: [], hasTestRan: false, tests: initialTests });
  };

  startTests = () => {
    const { tests } = this.state;
    this.setState({
      passedTests: [],
      hasTestRan: true,
      tests: initialTests,
      queuedTests: [...tests.map(test => test.description)]
    });
    const testQueue = this.state.tests.map(
      test =>
        new Promise((resolve, reject) =>
          test.run(status => this.updateTestStatus(status, test, resolve))
        )
    );
    Promise.all(testQueue);
  };

  render() {
    const { tests, passedTests, queuedTests, hasTestRan } = this.state;

    const columns = [
      {
        title: "Index",
        key: "index",
        render: (text, record, index) => index + 1
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        render: text => <span className="capitalize">{text}</span>
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (text, record) => {
          let displayText = "";
          if (text) {
            displayText = text;
          } else {
            displayText = queuedTests.includes(record.description)
              ? "RUNNING..."
              : "NOT RUNNING";
          }
          return (
            <span className="capitalize">
              <strong>{displayText}</strong>
            </span>
          );
        }
      }
    ];

    return (
      <div className="App">
        <Row>
          <Title level={2} className="app-title">
            Jed's Automated Test Runner V1
          </Title>
        </Row>

        <Row>
          <Col span={18} offset={3}>
            <Table columns={columns} dataSource={tests} rowKey="description" />
            {hasTestRan && queuedTests.length === 0 && (
              <Title level={2} className="app-title">
                DONE ALL TEST HAVE BEEN COMPLETED
              </Title>
            )}
          </Col>
        </Row>
        <Row>
          <Col span={18} offset={3} className="info-column capitalize">
            <Row className="action-buttons">
              <Button
                size="large"
                type="primary"
                disabled={!!queuedTests.length}
                onClick={this.startTests}
              >
                {!queuedTests.length ? "Run Tests" : "Running Tests..."}
              </Button>
              <Button
                size="large"
                type="danger"
                disabled={!!queuedTests.length}
                onClick={this.resetTestState}
              >
                Reset Tests
              </Button>
            </Row>
            <Text>
              Amount of tests that have passed so far:{" "}
              <strong>{passedTests.length}</strong>
            </Text>
            <br />
            <Text>
              Amount of tests that have failed so far:{" "}
              <strong>
                {!hasTestRan
                  ? 0
                  : tests.length - (queuedTests.length + passedTests.length)}
              </strong>
            </Text>
            <br />
            <Text>
              Amount of tests that are still running:{" "}
              <strong>{queuedTests.length}</strong>
            </Text>
            <br />
            <Text>
              All test completed:{" "}
              <strong>
                {!hasTestRan
                  ? "Test have not yet ran"
                  : queuedTests.length === 0
                    ? "TRUE"
                    : "FALSE"}
              </strong>
            </Text>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
