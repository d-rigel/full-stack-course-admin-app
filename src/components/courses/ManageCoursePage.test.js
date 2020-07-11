import React from "react";
import { mount } from "enzyme";
import { authors, newCourse, course } from "../../../tools/mockData";
import ManageCoursePage from "./ManageCoursePage";

function render(args) {
  const defaultProps = {
    authors,
    course,
    // Passed from Router in real app, so just stubbing in for test.
    // Could also choose to use MemoryRouter as shown in Header.test.js.
    //or even wrap with React Router, depending on whether i need to test React Router related behavior

    history: {},
    saveCourse: jest.fn(),
    loadAuthors: jest.fn(),
    loadCourses: jest.fn(),
    course: newCourse,
    match: {},
  };

  const props = { ...defaultProps, ...args };

  return mount(
    <Provider store={store}>
      <ManageCoursePage {...props} />
    </Provider>
  );
}

it("sets error when attempting to save an empty title field", () => {
  const wrapper = render();
  wrapper.find("form").simulate("submit");
  const error = wrapper.find(".alert").first();
  expect(error.text()).toBe("Title is required");
});
