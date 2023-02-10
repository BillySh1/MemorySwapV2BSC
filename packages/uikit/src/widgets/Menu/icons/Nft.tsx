import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <path d="M3.97206 3.08082C6.28349 1.00035 9.31232 -0.101537 12.4202 0.00736786C15.5282 0.116273 18.4724 1.42746 20.6326 3.66462C22.7927 5.90177 24 8.89016 24 12C24 12.3698 23.7002 12.6695 23.3305 12.6695C22.9607 12.6695 22.6609 12.3698 22.6609 12C22.6609 9.23718 21.5884 6.58226 19.6693 4.59475C17.7502 2.60723 15.1345 1.44235 12.3734 1.3456C9.61224 1.24885 6.92139 2.22778 4.86788 4.07609C2.81438 5.9244 1.55861 8.49773 1.36522 11.2538C1.17184 14.0098 2.05594 16.7333 3.8312 18.8502C5.60647 20.9672 8.13425 22.3123 10.8818 22.6021C13.6294 22.8919 16.3822 22.1037 18.56 20.4037C19.4054 19.7438 20.1385 18.9665 20.7416 18.1024C20.9533 17.7992 21.3707 17.725 21.6739 17.9367C21.9771 18.1483 22.0513 18.5657 21.8396 18.8689C21.1607 19.8415 20.3355 20.7164 19.384 21.4592C16.9326 23.3728 13.834 24.26 10.7414 23.9338C7.64869 23.6076 4.80342 22.0935 2.80517 19.7107C0.806923 17.3278 -0.188222 14.2622 0.0294547 11.16C0.247131 8.05783 1.66063 5.16128 3.97206 3.08082ZM23.1651 14.0415C23.5243 14.1294 23.7443 14.4918 23.6565 14.8509C23.5422 15.3182 23.4003 15.7766 23.2321 16.2239C23.1019 16.57 22.7158 16.7451 22.3697 16.6149C22.0236 16.4847 21.8486 16.0986 21.9787 15.7525C22.1282 15.3552 22.2542 14.948 22.3557 14.5328C22.4436 14.1737 22.806 13.9537 23.1651 14.0415Z" />
      <path d="M9.14954 11.7438C9.14954 9.95573 9.20042 8.15027 8.4168 6.81353C7.95883 6.03232 7.29733 5.65039 6.54424 5.65039H4V18.0109H6.54424C7.29733 18.0109 7.95883 17.629 8.4168 16.8477C9.20042 15.511 9.14954 13.5319 9.14954 11.7438ZM8.05043 11.7438C8.05043 13.4451 8.04025 14.7819 7.6637 15.4936C7.35839 16.0665 6.95132 16.3269 6.43229 16.3269H5.09911V7.33433H6.43229C6.95132 7.33433 7.35839 7.59474 7.6637 8.16763C8.04025 8.8794 8.05043 10.0425 8.05043 11.7438Z" />
      <path d="M15.1803 18.0109L12.5316 5.65039H11.6487L9 18.0109H10.167L10.6643 15.5284H13.5159L14.0132 18.0109H15.1803ZM13.2115 13.9312H10.989L12.1155 8.44539L13.2115 13.9312Z" />
      <path d="M20.1201 11.8306C20.1201 9.4917 20.1362 8.14298 19.5729 6.9479C19.1786 6.11135 18.6716 5.65039 18.0601 5.65039C17.4485 5.65039 16.9496 6.11135 16.5553 6.9479C15.992 8.14298 16 9.4917 16 11.8306C16 14.1696 15.992 15.5183 16.5553 16.7134C16.9496 17.5499 17.4485 18.0109 18.0601 18.0109C18.6716 18.0109 19.1786 17.5499 19.5729 16.7134C20.1362 15.5183 20.1201 14.1696 20.1201 11.8306ZM19.251 11.8306C19.251 14.272 19.1947 14.9549 18.9131 15.6037C18.7119 16.0646 18.398 16.3548 18.0601 16.3548C17.7221 16.3548 17.4082 16.0646 17.2071 15.6037C16.9254 14.9549 16.8691 14.272 16.8691 11.8306C16.8691 9.38927 16.9254 8.70637 17.2071 8.05761C17.4082 7.59666 17.7221 7.30642 18.0601 7.30642C18.398 7.30642 18.7119 7.59666 18.9131 8.05761C19.1947 8.70637 19.251 9.38927 19.251 11.8306Z" />
    </Svg>
  );
};

export default Icon;