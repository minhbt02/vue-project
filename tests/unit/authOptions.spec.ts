import { shallowMount } from "@vue/test-utils";
import AuthOptions from "@/components/home/AuthOptions.vue";

describe("AuthOptions.vue", () => {
  it("renders msg when passed", () => {
    const msg = "Login  Register";
    const wrapper = shallowMount(AuthOptions, {
      props: { loginChosen: false, registerChosen: false, msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
describe("AuthOptions.vue", () => {
  it("renders msg2 when passed", () => {
    const msg2 = "";
    const wrapper = shallowMount(AuthOptions, {
      props: { loginChosen: true, registerChosen: false, msg2 },
    });
    expect(wrapper.text()).toMatch(msg2);
  });
});
describe("AuthOptions.vue", () => {
  it("renders msg3 when passed", () => {
    const msg3 = "";
    const wrapper = shallowMount(AuthOptions, {
      props: { loginChosen: false, registerChosen: true, msg3 },
    });
    expect(wrapper.text()).toMatch(msg3);
  });
});
describe("AuthOptions.vue", () => {
  it("renders msg4 when passed", () => {
    const msg4 = "";
    const wrapper = shallowMount(AuthOptions, {
      props: { loginChosen: true, registerChosen: true, msg4 },
    });
    expect(wrapper.text()).toMatch(msg4);
  });
});