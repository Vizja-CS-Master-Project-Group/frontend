"use server";

import { get, post } from "@/lib/api";
import { ViewResourceInterface } from "@/types/misc";
import { LoanInterface } from "@/types/loan";

export async function loanShow() {
  return get<ViewResourceInterface<LoanInterface>>("loans");
}

export async function loanList() {
  return get<ViewResourceInterface<LoanInterface>>("loans");
}

export async function loanCreate() {
  return post<ViewResourceInterface<LoanInterface>>("loans", {});
}

export async function loanCreateSchema() {
  return get<ViewResourceInterface<LoanInterface>>("loans/create");
}

export async function loanFinalize() {}
