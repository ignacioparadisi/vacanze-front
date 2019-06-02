import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  isActive: boolean;
  collapsed: boolean;
  showMenu: string;
  pushRightClass: string;
  isLanding = true;
  isReclamoEquipaje = true;
  isReclamoClaim = true;
  isAuto = true;
  isAviones = true;
  isCreacionVuelos = true;
  isListadoVuelos = true;
  isUsuarios = true;
  isHoteles = true;
  isRestaurantes = true;
  isReservaVuelo = true;
  isReservaAuto = true;
  isReservaHab = true;
  isReservaRest = true;
  isMisReservas = true;
  isCruceros = true;
  isViajes = true;
  isPagos = true;
  @Output() collapsedEvent = new EventEmitter<boolean>();

  constructor(public router: Router, private modalService: NgbModal) {
    this.router.events.subscribe(val => {
      if (window.innerWidth <= 992 && this.isToggled()) {
        this.toggleSidebar();
      }
    });
  }


  ngOnInit() {
    this.isActive = false;
    this.collapsed = false;
    this.showMenu = "";
    this.pushRightClass = "push-right";
  }

  eventCalled() {
    this.isActive = !this.isActive;
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = "0";
    } else {
      this.showMenu = element;
    }
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.collapsedEvent.emit(this.collapsed);
  }

  isToggled(): boolean {
    const dom: Element = document.querySelector("body");
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector("body");
    dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
    const dom: any = document.querySelector("body");
    dom.classList.toggle("rtl");
  }

  onLoggedout() {
    localStorage.removeItem("isLoggedin");
  }
}
