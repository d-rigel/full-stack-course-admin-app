import React from "react";
import CourseForm from "./CourseForm";
import { shallow } from "enzyme";

function renderCourseForm(args) {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    onSave: () => {},
    onChange: () => {},
  };

  const props = { ...defaultProps, ...args };
  return shallow(<CourseForm {...props} />);
}

it("renders from and header", () => {
  const wrapper = renderCourseForm;
  //console.log(wrapper.debug());
  expect(wrapper.find("form").length).toBe(1);
  expect(wrapper.find("h2").text()).toEqual("Add Course");
});

it('labels save buttons as "Save" when not saving', () => {
  const wwrapper = renderCourseForm();
  expect(wrapper.find("button").text().toBe("Save"));
});

it('labels save buttons as "Save" when not saving', () => {
  const wwrapper = renderCourseForm({ saving: true });
  expect(wrapper.find("button").text().toBe("Saving..."));
});
