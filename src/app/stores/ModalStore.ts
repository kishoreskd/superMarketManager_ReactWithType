import { makeAutoObservable } from "mobx";

export default class ModalStore {
  isOpen = false;
  content: JSX.Element | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  openModal = (content: JSX.Element) => {
    this.isOpen = true;
    this.content = content;
  };

  closeModal = () => {
    this.isOpen = false;
    this.content = null;
  };
}