import { shallowMount } from "@vue/test-utils";
import LoginForm from "@/components/home/LoginForm.vue";

describe("LoginForm.vue", () => {
  it("renders empty string when passed", () => {
    const msg = "Login"
    const wrapper = shallowMount(LoginForm, {
      props: { loginChosen: false, username: "qwe", password: "asd", back: () => {}, loginSuccess: true, msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});