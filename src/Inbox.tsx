const fetchConversations = async () => {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) return;

  // 1️⃣ Get conversations
  const { data: convs } = await supabase
    .from("conversations")
    .select("*")
    .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`);

  if (!convs) return;

  // 2️⃣ Collect all user IDs involved
  const userIds = convs.flatMap((c: any) => [c.buyer_id, c.seller_id]);

  // 3️⃣ Fetch profiles manually
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, first_name, last_name")
    .in("id", userIds);

  // 4️⃣ Map profile lookup
  const profileMap: any = {};
  profiles?.forEach((p: any) => {
    profileMap[p.id] =
      `${p.first_name || ""} ${p.last_name || ""}`.trim();
  });

  // 5️⃣ Attach correct other user name
  const formatted = convs.map((conv: any) => {
    const isBuyer = conv.buyer_id === user.id;
    const otherUserId = isBuyer ? conv.seller_id : conv.buyer_id;

    return {
      ...conv,
      otherUserName: profileMap[otherUserId] || "User",
    };
  });

  setConversations(formatted);
};