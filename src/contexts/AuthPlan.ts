/**
 * PLANO DE IMPLEMENTAÇÃO — Sistema de Login e Roles
 * ===================================================
 * Debre na Rede · Debreceni FC
 * 
 * === BACKEND NECESSÁRIO ===
 * 
 * Supabase (recomendado — já usado em outros projetos seus):
 *   - Supabase Auth (email/senha + Google OAuth)
 *   - Supabase Database (PostgreSQL)
 *   - Supabase Storage (fotos/áudios da Resenha)
 *   - Supabase Realtime (notificações ao vivo)
 * 
 * === ROLES ===
 * 
 * 1. ADMIN (comissão técnica / presidente do clube)
 *    Permissões:
 *    ✓ Criar/editar/excluir notícias
 *    ✓ Gerenciar elenco (adicionar/remover/editar jogadores)
 *    ✓ Inserir resultados e estatísticas de jogos
 *    ✓ Cadastrar/remover parceiros
 *    ✓ Publicar novos mantos e gerenciar pré-vendas
 *    ✓ Moderar comentários da Resenha
 *    ✓ Ativar/desativar votações
 *    ✓ Enviar notificações push
 * 
 * 2. TORCEDOR (usuário comum logado)
 *    Permissões:
 *    ✓ Votar no Craque do Jogo e Gol Mais Bonito
 *    ✓ Comentar na Resenha do Interior (texto, áudio, foto)
 *    ✓ Curtir comentários
 *    ✓ Fazer reserva de manto
 *    ✓ Ver perfis e estatísticas completas
 * 
 * 3. VISITANTE (não logado)
 *    Permissões:
 *    ✓ Ver notícias, elenco, stats, galeria, história
 *    ✗ Não pode votar
 *    ✗ Não pode comentar
 *    ✗ Não pode reservar manto
 * 
 * === TABELAS SUPABASE ===
 * 
 * profiles (id, user_id, name, role, avatar_url, created_at)
 * news (id, title, body, category, image_url, author_id, published_at)
 * players (id, name, number, position, category, goals, assists, matches)
 * matches (id, opponent, date, location, score_home, score_away, status)
 * votes (id, match_id, voter_id, player_id, type['craque'|'gol'], created_at)
 * comments (id, match_id, author_id, text, audio_url, image_url, likes, created_at)
 * mantos (id, year, type, price, available, image_url)
 * orders (id, user_id, manto_id, size, status, created_at)
 * partners (id, name, category, description, discount, address, phone, logo_url)
 * 
 * === PRÓXIMOS PASSOS ===
 * 
 * 1. Criar projeto no Supabase
 * 2. Aplicar migrations das tabelas acima
 * 3. Configurar Row Level Security (RLS) por role
 * 4. Instalar: npm install @supabase/supabase-js
 * 5. Criar src/lib/supabaseClient.ts
 * 6. Substituir os TODO comentados em AuthContext.tsx
 * 7. Atualizar LoginScreen.tsx para usar useAuth()
 * 8. Proteger rotas de admin com <ProtectedRoute role="admin">
 * 9. Implementar upload de áudio/foto na Resenha via Supabase Storage
 * 10. Configurar push notifications via Supabase Edge Functions
 */

// Arquivo de referência — não tem código executável
export { }
