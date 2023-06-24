import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';

// Animations
import { fadeInOut } from '../../../core/animations/fade-in-out.animation';

// Constants
import { keys } from '../../../core/constants/keys';

// Models
import { IDropdownOption } from '../../../core/models/dropdown-option.model';

@Component({
  selector: 'app-dropdown',
  templateUrl: 'dropdown.component.html',
  styleUrls: ['dropdown.component.scss'],
  animations: [fadeInOut],
})
export class DropdownComponent implements OnInit {
  open: boolean = false;

  leftStyle: number = 0;
  top: number = 0;
  left: number = 0;
  width: number = 0;
  height: number = 0;
  dropdownWidth: number = 0;

  @Input({ required: true }) options: IDropdownOption[] = [];
  @Input() position: 'left' | 'center' | 'right' = 'left';

  @ViewChild('dropdown', { static: false }) dropdown: ElementRef<HTMLDivElement> | undefined;

  @HostListener('document:click', ['$event'])
  private onGlobalClick(event: MouseEvent): void {
    if (!this.element.nativeElement.contains(<HTMLElement>event.target)) {
      this.closeDropdown();
    }
  }

  @HostListener('document:keydown', ['$event'])
  private onGlobalKeyDown(e: KeyboardEvent) {
    if (document.activeElement === this.element.nativeElement) {
      if (e.key === keys.space || e.key === keys.enter) {
        this.openDropdown();
        return;
      }
    }

    if (e.key === keys.esc && this.open) {
      this.closeDropdown();
    }
  }

  @HostListener('click', ['$event'])
  private onClick(event: MouseEvent) {
    if (!(<HTMLElement>event.target).className.includes('dropdown')) {
      this.openDropdown();
    }
  }

  @HostListener('mouseenter')
  private onMouseEnter() {
    this.openDropdown();
  }

  @HostListener('mouseleave')
  private onMouseLeave() {
    this.closeDropdown();
  }

  @HostBinding('attr.tabindex') tabindex = '0';

  constructor(
    private element: ElementRef<HTMLElement>,
  ) {}

  ngOnInit() {
    this.initializeRect();
  }

  onOptionClick(action: () => void) {
    this.closeDropdown();
    action();
  }

  private openDropdown() {
    this.initializeRect();
    this.initializeDropdownRect();

    this.calculatePosition();

    this.open = true;
  }

  private closeDropdown() {
    this.open = false;
  }

  private initializeRect() {
    const rect = this.element.nativeElement.getBoundingClientRect();

    this.top = rect.top;
    this.left = rect.left;
    this.width = rect.width;
    this.height = rect.height;
  }

  private initializeDropdownRect() {
    if (!this.dropdown || !this.dropdown.nativeElement) {
      return;
    }

    const dropdownRect = this.dropdown.nativeElement.getBoundingClientRect();

    this.dropdownWidth = dropdownRect.width;
  }

  private calculatePosition() {
    if (this.position === 'right') {
      this.leftStyle = (this.left - this.dropdownWidth) + this.width;
    } else if (this.position === 'center') {
      this.leftStyle = this.left - (this.dropdownWidth / 2) + (this.width / 2);
    } else if (this.position === 'left') {
      this.leftStyle = this.left;
    }
  }
}
