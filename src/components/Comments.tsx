import { useState } from "react";
import { useComentarios, useEnviarComentario } from "@/hooks/useComentarios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send, CheckCircle2, User } from "lucide-react";

interface CommentsProps {
  postId: string;
}

export function Comments({ postId }: CommentsProps) {
  const { data: comments, isLoading, isError } = useComentarios(postId);
  const enviarMutation = useEnviarComentario();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !conteudo.trim()) return;

    setErro("");
    try {
      await enviarMutation.mutateAsync({
        nome,
        email,
        conteudo,
        postId,
      });
      setSucesso(true);
      setNome("");
      setEmail("");
      setConteudo("");
    } catch (err) {
      setErro("Não foi possível enviar seu comentário no momento.");
    }
  };

  return (
    <div className="w-full mt-10 space-y-8">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="h-5 w-5 text-primary" />
        <h3 className="text-2xl font-serif font-bold">Comentários</h3>
        {!isLoading && !isError && comments && (
          <span className="bg-primary/10 text-primary text-sm font-semibold px-2 py-0.5 rounded-full ml-2">
            {comments.length}
          </span>
        )}
      </div>

      {/* Formulário de Comentário */}
      <div className="bg-card border border-border rounded-xl p-5 md:p-6 shadow-sm">
        <h4 className="font-semibold text-lg mb-4">Deixe seu comentário</h4>
        
        {sucesso ? (
          <div className="bg-primary/10 text-primary flex items-start gap-3 p-4 rounded-lg">
            <CheckCircle2 className="h-5 w-5 mt-0.5" />
            <div>
              <p className="font-semibold">Seu comentário foi enviado!</p>
              <p className="text-sm">Ele está aguardando moderação e logo aparecerá aqui.</p>
            </div>
            <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setSucesso(false)}>
              Comentar novamente
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Input
                  placeholder="Seu Nome *"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  className="bg-muted/50"
                  maxLength={50}
                />
              </div>
              <div className="space-y-1">
                <Input
                  type="email"
                  placeholder="Seu Email (não fica visível)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-muted/50"
                  maxLength={100}
                />
              </div>
            </div>
            
            <Textarea
              placeholder="Escreva sua mensagem aqui... *"
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
              required
              rows={4}
              className="bg-muted/50 resize-y"
              maxLength={1000}
            />

            {erro && <p className="text-destructive text-sm font-medium">{erro}</p>}

            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={enviarMutation.isPending || !nome.trim() || !conteudo.trim()}
                className="btn-wood gap-2"
              >
                {enviarMutation.isPending ? "Enviando..." : (
                  <>
                    <Send className="h-4 w-4" /> Enviar Comentário
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Lista de Comentários */}
      <div className="space-y-4 mt-8">
        {isLoading && <p className="text-muted-foreground">Carregando comentários...</p>}
        {isError && <p className="text-destructive text-sm">Erro ao carregar comentários.</p>}
        
        {!isLoading && !isError && comments && comments.length === 0 && (
          <p className="text-muted-foreground italic text-center py-6 bg-muted/20 border border-border/50 rounded-lg">
            Seja o primeiro a comentar!
          </p>
        )}

        {!isLoading && !isError && comments && comments.map((comment, i) => (
          <div key={i} className="flex gap-4 p-5 rounded-lg border border-border bg-card">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex flex-shrink-0 items-center justify-center text-primary mt-1">
              <User className="h-5 w-5" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-baseline justify-between mb-2">
                <h5 className="font-semibold text-foreground">{comment.nome}</h5>
                {comment.data && (
                  <span className="text-xs text-muted-foreground">
                    {new Date(comment.data).toLocaleDateString('pt-BR')}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground text-sm whitespace-pre-wrap leading-relaxed">
                {comment.conteudo}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
