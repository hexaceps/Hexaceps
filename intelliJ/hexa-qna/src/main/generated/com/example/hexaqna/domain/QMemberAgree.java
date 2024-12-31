package com.example.hexaqna.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QMemberAgree is a Querydsl query type for MemberAgree
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QMemberAgree extends BeanPath<MemberAgree> {

    private static final long serialVersionUID = 2143856873L;

    public static final QMemberAgree memberAgree = new QMemberAgree("memberAgree");

    public final BooleanPath an1 = createBoolean("an1");

    public final BooleanPath an2 = createBoolean("an2");

    public final BooleanPath an3 = createBoolean("an3");

    public final BooleanPath as1 = createBoolean("as1");

    public final BooleanPath as2 = createBoolean("as2");

    public QMemberAgree(String variable) {
        super(MemberAgree.class, forVariable(variable));
    }

    public QMemberAgree(Path<? extends MemberAgree> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMemberAgree(PathMetadata metadata) {
        super(MemberAgree.class, metadata);
    }

}

