import React from "react";
import { NavLink } from "react-router-dom";
import '@testing-library/jest-dom';
import { shallow } from "enzyme";
import LandingPage from "./LandingPage";

describe("<LandingPage /> Mounted", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<LandingPage />);
  });
  it("Deberia renderizar Un <NavLink />", () => {
    expect(wrapper.find(NavLink)).toHaveLength(1);
  });
  it("El NavLink debe de contener el texto 'Ingresar' y cambiar la ruta hacia '/home'.", () => {
    expect(wrapper.find(NavLink).at(0).prop("to")).toEqual("/home");
    expect(wrapper.find(NavLink).at(0).text()).toEqual("Ingresar");
  });
});
