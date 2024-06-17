"use server";

import { get, post, put } from "@/lib/api";
import { ViewInterface, ViewResourceInterface } from "@/types/misc";
import {
  LoanCreateSchemaInterface,
  LoanFinalizeSchemaInterface,
  LoanInterface,
} from "@/types/loan";
import { CreateLoanFromSchema } from "@/containers/forms/loans/loan-create-form";

export async function loanShow(id: number) {
  return get<ViewInterface<LoanInterface>>(`loans/${id}`);
}

export async function loanList() {
  return get<ViewResourceInterface<LoanInterface>>("loans");
}

export async function loanCreate(data: CreateLoanFromSchema) {
  return post<ViewInterface<LoanInterface>>("loans", data);
}

export async function loanCreateSchema() {
  return get<LoanCreateSchemaInterface>("loans/create");
}

export async function loanFinalizeSchema(id: number) {
  return get<LoanFinalizeSchemaInterface>(`loans/${id}/edit`);
}

export async function loanFinalize(id: number | string) {
  return put<LoanFinalizeSchemaInterface>(`loans/${id}`, {});
}
