import RangePicker from './index.js';

describe("RangePicker", () => {
  let rangePicker;

  beforeEach(() => {

    rangePicker = new RangePicker({
      from: new Date(2019, 9, 2),
      to:   new Date(2019, 10, 5)
    });

    document.body.append(rangePicker.elem);
  });

  afterEach(() => {
    rangePicker.destroy();
  });

  it("Initially shows only input", () => {
    expect(document.querySelector('.rangepicker__input')).toBeInstanceOf(HTMLElement);
    expect(document.querySelector('.rangepicker__selector').innerHTML).toEqual("");
  });

  it("Opens on click", () => {
    document.querySelector('.rangepicker__input').dispatchEvent(new MouseEvent("click"));
    expect(document.querySelector('.rangepicker__selector').firstElementChild.offsetHeight).not.toEqual(0);
  });

  it("Closes on second click", function() {
    document.querySelector('.rangepicker__input').dispatchEvent(new MouseEvent("click"));
    document.querySelector('.rangepicker__input').dispatchEvent(new MouseEvent("click"));
    expect(document.querySelector('.rangepicker__selector').firstElementChild.offsetHeight).toEqual(0);
  });

  it("Shows selected dates from-to in input", () => {
    document.querySelector('.rangepicker__input').dispatchEvent(new MouseEvent("click"));
    expect(document.querySelector('.rangepicker__input').textContent).toMatch(/10\/2\/19/);
    expect(document.querySelector('.rangepicker__input').textContent).toMatch(/11\/5\/19/);
  });

  it("Shows selected months from-to in selector control", () => {
    document.querySelector('.rangepicker__input').dispatchEvent(new MouseEvent("click"));
    let calendars = Array.from(document.querySelectorAll('.rangepicker__calendar'));
    expect(calendars[0].querySelector('time').textContent).toMatch("October");
    expect(calendars[1].querySelector('time').textContent).toMatch("November");
  });

  it("Shows selected months after prev month selection", () => {
    document.querySelector('.rangepicker__input').dispatchEvent(new MouseEvent("click"));
    document.querySelector('.rangepicker__selector-control-left').dispatchEvent(new MouseEvent("click"));
    let calendars = Array.from(document.querySelectorAll('.rangepicker__calendar'));
    expect(calendars[0].querySelector('time').textContent).toMatch("September");
    expect(calendars[1].querySelector('time').textContent).toMatch("October");
  });

  it("Shows selected months after next month selection", () => {
    document.querySelector('.rangepicker__input').dispatchEvent(new MouseEvent("click"));
    document.querySelector('.rangepicker__selector-control-right').dispatchEvent(new MouseEvent("click"));
    let calendars = Array.from(document.querySelectorAll('.rangepicker__calendar'));
    expect(calendars[0].querySelector('time').textContent).toMatch("November");
    expect(calendars[1].querySelector('time').textContent).toMatch("December");
  });
/*
  it("Makes new Range selection", () => {
    document.querySelector('.rangepicker__input').dispatchEvent(new MouseEvent("click"));
    let date = new Date(2019, 9, 3);
    document.querySelector(`[data-value="${date.toISOString()}"]`).dispatchEvent(new MouseEvent("click"));
    expect(document.querySelector(`[data-value="${date.toISOString()}"]`)).toEqual(true);
    date = new Date(2019, 10, 5);
    document.querySelector(`[data-value="${date.toISOString()}"]`).dispatchEvent(new MouseEvent("click"));
    expect(document.querySelector(`[data-value="${date.toISOString()}"]`).closest('.rangepicker__cell').classList.contains("rangepicker__selected-to")).toEqual(true);
    //expect(document.querySelector('.rangepicker__selector').firstElementChild.offsetHeight).toEqual(0);
    //expect(document.querySelector('.rangepicker__input').textContent).toMatch(/10\/1\/19/);
    //expect(document.querySelector('.rangepicker__input').textContent).toMatch(/11\/10\/19/);
  });
*/
  // ...
});
