import type { ReactNode } from "react";

type MockPageProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

export function MockPage({ title, description, children }: MockPageProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </section>

      {children ? (
        children
      ) : (
        <section className="rounded-xl border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">
            Conteúdo mock temporário para validação de layout e navegação.
          </p>
        </section>
      )}
    </div>
  );
}
